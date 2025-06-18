const { logger } = require("./logger")
const { createAuditRecord } = require("./auditTrail")
const { ethers } = require("ethers")
const VAULT_ABI = require("../contracts/VaultABI.json")

// Initialize provider and contract
const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL)
const wallet = new ethers.Wallet(process.env.VAULT_PRIVATE_KEY, provider)
const vaultContract = new ethers.Contract(process.env.VAULT_CONTRACT_ADDRESS, VAULT_ABI, wallet)

/**
 * Process vault actions based on event data
 *
 * @param {Object} event - Event data
 * @returns {Promise<Object>} - Vault action result
 */
exports.processVaultAction = async (event) => {
  try {
    const { type, data } = event
    const actionId = `vault_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`

    logger.info(`🏦 Processing vault action [${actionId}]`, {
      actionId,
      type,
      data,
    })

    // Create audit record for vault action
    await createAuditRecord({
      eventId: actionId,
      eventType: type,
      source: "vault",
      timestamp: new Date(),
      status: "processing",
      data,
    })

    let result

    // Process different vault actions
    switch (type) {
      case "vault.deposit.confirmed":
        // Handle deposit confirmation
        result = await handleDepositConfirmation(data)
        break

      case "vault.withdrawal.requested":
        // Handle withdrawal request
        result = await handleWithdrawalRequest(data)
        break

      case "vault.echo.minted":
        // Handle ECHO token minting
        result = await handleEchoMinting(data)
        break

      case "vault.echo.burned":
        // Handle ECHO token burning
        result = await handleEchoBurning(data)
        break

      default:
        throw new Error(`Unknown vault action type: ${type}`)
    }

    // Update audit record with action result
    await createAuditRecord({
      eventId: actionId,
      eventType: `${type}.completed`,
      source: "vault",
      timestamp: new Date(),
      status: "completed",
      data: {
        ...data,
        result,
      },
    })

    logger.info(`✅ Vault action completed [${actionId}]`, {
      actionId,
      result,
    })

    return result
  } catch (err) {
    logger.error(`❌ Vault action error: ${err.message}`, { error: err.stack })
    throw err
  }
}

/**
 * Handle deposit confirmation
 */
async function handleDepositConfirmation(data) {
  try {
    const { walletAddress, amount, token } = data

    // Verify deposit on-chain if needed
    // const depositTx = await vaultContract.verifyDeposit(walletAddress, amount, token);

    // Update vault state
    const updateTx = await vaultContract.updateVaultState(
      walletAddress,
      ethers.utils.parseUnits(amount.toString(), 18),
      token,
      "DEPOSIT",
    )

    // Wait for transaction confirmation
    const receipt = await updateTx.wait()

    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      status: "confirmed",
    }
  } catch (err) {
    logger.error(`Deposit confirmation error: ${err.message}`)
    throw err
  }
}

/**
 * Handle withdrawal request
 */
async function handleWithdrawalRequest(data) {
  try {
    const { walletAddress, amount, token } = data

    // Process withdrawal on-chain
    const withdrawalTx = await vaultContract.processWithdrawal(
      walletAddress,
      ethers.utils.parseUnits(amount.toString(), 18),
      token,
    )

    // Wait for transaction confirmation
    const receipt = await withdrawalTx.wait()

    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      status: "processed",
    }
  } catch (err) {
    logger.error(`Withdrawal request error: ${err.message}`)
    throw err
  }
}

/**
 * Handle ECHO token minting
 */
async function handleEchoMinting(data) {
  try {
    const { walletAddress, amount } = data

    // Mint ECHO tokens
    const mintTx = await vaultContract.mintEchoTokens(walletAddress, ethers.utils.parseUnits(amount.toString(), 18))

    // Wait for transaction confirmation
    const receipt = await mintTx.wait()

    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      status: "minted",
    }
  } catch (err) {
    logger.error(`ECHO minting error: ${err.message}`)
    throw err
  }
}

/**
 * Handle ECHO token burning
 */
async function handleEchoBurning(data) {
  try {
    const { walletAddress, amount } = data

    // Burn ECHO tokens
    const burnTx = await vaultContract.burnEchoTokens(walletAddress, ethers.utils.parseUnits(amount.toString(), 18))

    // Wait for transaction confirmation
    const receipt = await burnTx.wait()

    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      status: "burned",
    }
  } catch (err) {
    logger.error(`ECHO burning error: ${err.message}`)
    throw err
  }
}
