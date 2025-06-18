const { logger } = require("../utils/logger")
const { ethers } = require("ethers")
const ECHO_ABI = require("../contracts/EchoTokenABI.json")

/**
 * On-chain transaction service
 */
class OnChainService {
  constructor() {
    // Initialize provider and wallet
    this.provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL)
    this.wallet = new ethers.Wallet(process.env.ONCHAIN_PRIVATE_KEY, this.provider)

    // Initialize token contracts
    this.echoTokenContract = new ethers.Contract(process.env.ECHO_TOKEN_ADDRESS, ECHO_ABI, this.wallet)

    logger.info("On-chain service initialized")
  }

  /**
   * Send on-chain transaction
   */
  async sendTransaction(params) {
    try {
      const { amount, token, recipient, reference } = params

      logger.info(`Sending on-chain ${token} transaction to ${recipient}`, { amount })

      let tx, receipt

      // Handle different token types
      switch (token.toUpperCase()) {
        case "ECHO":
          // Send ECHO tokens
          tx = await this.echoTokenContract.transfer(recipient, ethers.utils.parseUnits(amount.toString(), 18), {
            gasLimit: 200000,
          })
          break

        case "ETH":
          // Send ETH
          tx = await this.wallet.sendTransaction({
            to: recipient,
            value: ethers.utils.parseEther(amount.toString()),
            gasLimit: 21000,
          })
          break

        default:
          throw new Error(`Unsupported token: ${token}`)
      }

      // Wait for transaction confirmation
      receipt = await tx.wait()

      return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        token,
        amount,
        recipient,
        reference,
        status: "confirmed",
        timestamp: new Date().toISOString(),
      }
    } catch (err) {
      logger.error(`On-chain transaction error: ${err.message}`)
      throw err
    }
  }

  /**
   * Check transaction status
   */
  async checkTransactionStatus(txHash) {
    try {
      // Get transaction receipt
      const receipt = await this.provider.getTransactionReceipt(txHash)

      if (!receipt) {
        return {
          transactionHash: txHash,
          status: "pending",
          timestamp: new Date().toISOString(),
        }
      }

      return {
        transactionHash: txHash,
        blockNumber: receipt.blockNumber,
        status: receipt.status === 1 ? "confirmed" : "failed",
        timestamp: new Date().toISOString(),
      }
    } catch (err) {
      logger.error(`Transaction status check error: ${err.message}`)
      throw err
    }
  }
}

module.exports = { OnChainService }
