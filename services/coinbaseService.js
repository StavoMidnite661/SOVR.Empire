const { logger } = require("../utils/logger")
const { cdpClient } = require("./cdpClient")

/**
 * Coinbase payment service
 */
class CoinbaseService {
  constructor() {
    this.cdpClient = cdpClient
    logger.info("Coinbase service initialized")
  }

  /**
   * Send payment via Coinbase
   */
  async sendPayment(params) {
    try {
      logger.info(`Sending Coinbase payment to ${params.destination}`, {
        amount: params.amount,
        currency: params.currency,
      })

      // Create payout via CDP client
      const payout = await this.cdpClient.createPayout({
        amount: params.amount,
        currency: params.currency,
        destination: params.destination,
        description: `SOVR Trust Payment - ${params.reference}`,
      })

      return {
        id: payout.id,
        status: payout.status,
        destination: params.destination,
        amount: params.amount,
        currency: params.currency,
        reference: params.reference,
        timestamp: new Date().toISOString(),
      }
    } catch (err) {
      logger.error(`Coinbase payment error: ${err.message}`)
      throw err
    }
  }

  /**
   * Check payment status
   */
  async checkPaymentStatus(paymentId) {
    try {
      // Get payout details from CDP client
      const payout = await this.cdpClient.getPayout(paymentId)

      return {
        id: payout.id,
        status: payout.status,
        timestamp: new Date().toISOString(),
      }
    } catch (err) {
      logger.error(`Coinbase status check error: ${err.message}`)
      throw err
    }
  }
}

module.exports = { CoinbaseService }
