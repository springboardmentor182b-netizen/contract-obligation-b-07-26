// Simple authentication test to validate login/register flows
// This can be run in browser console or adapted for proper testing framework

const API_BASE_URL = 'https://contractiq-server.onrender.com';

async function testRegistration() {
  console.log('Testing Registration...');
  
  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'TestPass123!',
    role: 'Employee',
    department: 'Engineering'
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Registration successful:', data);
      return { success: true, user: testUser };
    } else {
      const error = await response.json();
      console.log('❌ Registration failed:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.log('❌ Registration error:', error);
    return { success: false, error };
  }
}

async function testLogin(email, password, role) {
  console.log('Testing Login...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Login successful:', data);
      return { success: true, token: data.access_token };
    } else {
      const error = await response.json();
      console.log('❌ Login failed:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.log('❌ Login error:', error);
    return { success: false, error };
  }
}

async function testAuthFlow() {
  console.log('=== Starting Authentication Flow Test ===\n');
  
  // Test registration
  const regResult = await testRegistration();
  
  if (regResult.success) {
    // Test login with registered user
    const loginResult = await testLogin(
      regResult.user.email, 
      regResult.user.password, 
      regResult.user.role
    );
    
    if (loginResult.success) {
      console.log('\n✅ Full authentication flow successful!');
      console.log('Token received:', loginResult.token.substring(0, 20) + '...');
    } else {
      console.log('\n❌ Authentication flow failed at login step');
    }
  } else {
    console.log('\n❌ Authentication flow failed at registration step');
  }
  
  console.log('\n=== Test Complete ===');
}

// Run tests
testAuthFlow();