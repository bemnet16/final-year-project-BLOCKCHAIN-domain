const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("🚀 Deploying StarsToken...")
    const starsToken = await deploy("StarsToken", {
        from: deployer,
        args: [deployer],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`✅ StarsToken deployed at: ${starsToken.address}`)

    log("🚀 Deploying StarsPlatform...")
    const starsPlatform = await deploy("StarsPlatform", {
        from: deployer,
        args: [starsToken.address, deployer],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`✅ StarsPlatform deployed at: ${starsPlatform.address}`)

    // Automatically verify if on public network
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(starsToken.address, [deployer])
        await verify(starsPlatform.address, [starsToken.address, deployer])
    }

    log("✅ Deployment complete.")
    log("--------------------------------------------------")
}

module.exports.tags = ["all", "stars"]
