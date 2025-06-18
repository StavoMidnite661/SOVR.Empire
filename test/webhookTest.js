const axios = require('axios');

async function testWebhook() {
  try {
    const baseUrl = 'http://localhost:3000/webhook';

    // Test main webhook POST
    let response = await axios.post(baseUrl + '/', {
      id: 'evt_123',
      type: 'vault.deposit.confirmed',
      data: {
        amount: 100,
        currency: 'USD',
        walletAddress: '0xabc',
        payoutMethod: 'default',
      },
    });
    console.log('POST / response:', response.data);

    // Test /vault POST
    response = await axios.post(baseUrl + '/vault', {
      id: 'evt_124',
      type: 'vault.deposit.confirmed',
      data: {
        amount: 50,
        currency: 'USD',
        walletAddress: '0xdef',
        payoutMethod: 'default',
      },
    });
    console.log('POST /vault response:', response.data);

    // Test /cdp POST
    response = await axios.post(baseUrl + '/cdp', {
      id: 'evt_125',
      type: 'cdp.transaction.confirmed',
      data: {
        amount: 75,
        currency: 'USD',
        destination: '0xghi',
        payoutMethod: 'coinbase',
      },
    });
    console.log('POST /cdp response:', response.data);

    // Test /trust-check POST
    response = await axios.post(baseUrl + '/trust-check', {
      id: 'evt_126',
      type: 'trust.check.presented',
      data: {
        sender: 'Alice',
        recipient: 'Bob',
        amount: 200,
        checkId: 'chk_001',
        payoutMethod: 'zelle',
      },
    });
    console.log('POST /trust-check response:', response.data);

    // Test GET /status
    response = await axios.get(baseUrl + '/status');
    console.log('GET /status response:', response.data);

  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testWebhook();
