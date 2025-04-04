const axios = require('axios');

// Base URL for API
const API_URL = 'http://localhost:5000/api';

// Test user registration
const testUserRegistration = async () => {
  try {
    console.log('Testing user registration...');
    const response = await axios.post(`${API_URL}/users/register`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('User registered successfully:');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

// Test user login
const testUserLogin = async () => {
  try {
    console.log('\nTesting user login...');
    const response = await axios.post(`${API_URL}/users/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('User logged in successfully:');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

// Test creating a task
const testCreateTask = async (token) => {
  try {
    console.log('\nTesting task creation...');
    const response = await axios.post(
      `${API_URL}/tasks`,
      {
        title: 'Test Task',
        description: 'This is a test task'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('Task created successfully:');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating task:');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

// Test getting all tasks
const testGetTasks = async (token) => {
  try {
    console.log('\nTesting get all tasks...');
    const response = await axios.get(
      `${API_URL}/tasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    console.log('Tasks retrieved successfully:');
    console.log(response.data);
  } catch (error) {
    console.error('Error getting tasks:');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

// Run tests
const runTests = async () => {
  // Register user
  const userData = await testUserRegistration();
  if (!userData) return;
  
  // Login user
  const loginData = await testUserLogin();
  if (!loginData) return;
  
  // Create task
  const taskData = await testCreateTask(loginData.token);
  if (!taskData) return;
  
  // Get all tasks
  await testGetTasks(loginData.token);
};

// Run all tests
runTests();
