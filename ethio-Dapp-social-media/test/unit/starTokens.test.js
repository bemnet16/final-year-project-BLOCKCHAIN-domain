const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { expect, assert } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("StarsToken & StarsPlatform", function () {
          let deployer, user
          let starsToken, starsPlatform

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              const accounts = await ethers.getSigners()
              user = accounts[1]
              await deployments.fixture(["stars"])

              starsToken = await ethers.getContract("StarsToken", deployer)
              starsPlatform = await ethers.getContract(
                  "StarsPlatform",
                  deployer
              )
          })

          describe("StarsToken", function () {
              it("Initial supply is correctly assigned to deployer", async () => {
                  const balance = await starsToken.balanceOf(deployer)
                  assert.equal(
                      balance.toString(),
                      ethers.parseEther("100000").toString()
                  )
              })

              it("Allows minting and burning", async () => {
                  await starsToken.mint(user.address, ethers.parseEther("1000"))
                  const userBal = await starsToken.balanceOf(user.address)
                  assert.equal(
                      userBal.toString(),
                      ethers.parseEther("1000").toString()
                  )

                  await starsToken.connect(user).burn(ethers.parseEther("500"))
                  const updatedBal = await starsToken.balanceOf(user.address)
                  assert.equal(
                      updatedBal.toString(),
                      ethers.parseEther("500").toString()
                  )
              })
          })

          describe("StarsPlatform", function () {
              beforeEach(async () => {
                  // Refill platform contract with some stars
                  await starsToken.mint(deployer, ethers.parseEther("10000"))
                  await starsToken.approve(
                      starsPlatform.target,
                      ethers.parseEther("10000")
                  )
                  await starsPlatform.refillStars(ethers.parseEther("10000"))

                  // Mint to user for testing
                  await starsToken.mint(user.address, ethers.parseEther("2000"))
                  await starsToken
                      .connect(user)
                      .approve(starsPlatform.target, ethers.parseEther("2000"))
              })

              it("Should allow users to buy Stars", async () => {
                  const userPlatform = starsPlatform.connect(user)
                  await userPlatform.buyStars({ value: ethers.parseEther("1") })
                  const bal = await starsToken.balanceOf(user.address)
                  assert(bal > ethers.parseEther("100")) // At least 100
              })

              it("Should allow gifting stars", async () => {
                  const userPlatform = starsPlatform.connect(user)
                  const recipient = (await ethers.getSigners())[2]

                  await userPlatform.giftStars(
                      recipient.address,
                      ethers.parseEther("100")
                  )
                  const recipientBal = await starsToken.balanceOf(
                      recipient.address
                  )
                  assert.equal(
                      recipientBal.toString(),
                      ethers.parseEther("100").toString()
                  )
              })

              it("Should allow unlocking premium features", async () => {
                  await starsPlatform.setFeaturePrice(
                      "VIP",
                      ethers.parseEther("500")
                  )
                  await starsPlatform.connect(user).unlockFeature("VIP")

                  const finalBal = await starsToken.balanceOf(user.address)
                  assert.equal(
                      finalBal.toString(),
                      ethers.parseEther("1500").toString()
                  )
              })

              it("Should revert when unlocking unavailable feature", async () => {
                  await expect(
                      starsPlatform.connect(user).unlockFeature("NOT_SET")
                  ).to.be.revertedWith("Feature not available")
              })

              it("Allows owner to withdraw stars and MATIC", async () => {
                  // Send ETH to platform first
                  await starsPlatform
                      .connect(user)
                      .buyStars({ value: ethers.parseEther("1") })

                  const tx = await starsPlatform.withdrawMATIC()
                  await tx.wait()

                  await starsPlatform.withdrawStars(ethers.parseEther("1000"))
                  const deployerBal = await starsToken.balanceOf(deployer)
                  assert(deployerBal > ethers.parseEther("1000"))
              })
          })
      })
