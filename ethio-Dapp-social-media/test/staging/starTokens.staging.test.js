const { assert } = require("chai")
const { network, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("StarsPlatform Staging Tests", function () {
          let deployer
          let starsPlatform
          let starsToken
          const buyAmount = ethers.parseEther("0.001")

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              starsPlatform = await ethers.getContract(
                  "StarsPlatform",
                  deployer
              )
              starsToken = await ethers.getContract("StarsToken", deployer)
          })

          it("allows a user to buy stars and unlock premium feature", async () => {
              // Buy tokens from StarsPlatform
              const buyTx = await starsPlatform.buyStars({ value: buyAmount })
              await buyTx.wait(1)

              const tokenBal = await starsToken.balanceOf(deployer)
              console.log(
                  `Token balance after buy: ${ethers.formatEther(
                      tokenBal
                  )} STARS`
              )
              assert(tokenBal > ethers.parseEther("0.1"))

              // Set and unlock premium feature
              await starsPlatform.setFeaturePrice(
                  "EarlyAccess",
                  ethers.parseEther("0.05")
              )

              await starsToken.approve(
                  starsPlatform.target,
                  ethers.parseEther("0.05")
              )

              const unlockTx = await starsPlatform.unlockFeature("EarlyAccess")
              await unlockTx.wait(1)

              const finalBalance = await starsToken.balanceOf(deployer)
              console.log(
                  `Token balance after unlock: ${ethers.formatEther(
                      finalBalance
                  )} STARS`
              )
              assert(finalBalance < tokenBal)
          })
      })
