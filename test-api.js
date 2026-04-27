const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing API...');

    // Test register
    console.log('1. Testing registration...');
    const registerRes = await axios.post('http://localhost:5003/api/auth/register', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Register response:', registerRes.data);

    // Test login
    console.log('2. Testing login...');
    const loginRes = await axios.post('http://localhost:5003/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Login response:', loginRes.data);

    // Test protected route
    console.log('3. Testing protected route...');
    const meRes = await axios.get('http://localhost:5003/api/auth/me', {
      headers: { Authorization: `Bearer ${loginRes.data.token}` }
    });
    console.log('Profile response:', meRes.data);

    console.log('✅ All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAPI();