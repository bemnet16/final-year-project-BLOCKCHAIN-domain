const { ethers } = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners()
    console.log(`🚀 Using deployer: ${deployer.address}`)

    const starsToken = await ethers.getContract("StarsToken", deployer)
    const starsPlatform = await ethers.getContract("StarsPlatform", deployer)

    const refillAmount = ethers.parseEther("10000")
    const platformBalance = await starsToken.balanceOf(starsPlatform.target)

    console.log(
        `💰 StarsPlatform current balance: ${ethers.formatEther(
            platformBalance
        )} STARS`
    )

    if (platformBalance < refillAmount) {
        console.log("🔄 Approving...")
        const approveTx = await starsToken.approve(
            starsPlatform.target,
            refillAmount
        )
        await approveTx.wait(1)

        console.log("🛠 Refilling StarsPlatform...")
        const refillTx = await starsPlatform.refillStars(refillAmount)
        await refillTx.wait(1)

        console.log("✅ Refill complete!")
    } else {
        console.log("✅ StarsPlatform already has enough Stars.")
    }
}

main().catch((error) => {
    console.error("❌ Refill failed:", error)
    process.exit(1)
})
