/**
 * Jest Test Suite for Todo List API
 * 
 * This file contains unit tests for all API endpoints using Jest and Supertest.
 * To run these tests:
 * 1. Install dependencies: npm install --save-dev jest supertest
 * 2. Add to package.json scripts: "test": "jest"
 * 3. Run: npm test
 */

const axios = require('axios');

// Base URL for API
const API_URL = 'http://localhost:5000/api';

// Test data with dynamic values to avoid conflicts
const testData = {
  users: {
    valid: {
      username: 'testuser_' + Date.now(),
      email: `test${Date.now()}@example.com`,
      password: 'Password123!'
    },
    invalid: {
      username: 'te', // Too short
      email: 'not-an-email',
      password: '123' // Too short
    }
  },
  tasks: {
    valid: {
      title: 'Test Task',
      description: 'This is a test task created by the automated test suite'
    },
    invalid: {
      title: '', // Empty title
      description: 'Task with no title'
    },
    update: {
      title: 'Updated Task Title',
      description: 'This task was updated by the test suite',
      completed: true
    }
  },
  auth: {
    token: null,
    userId: null,
    taskId: null
  }
};

/**
 * Helper function to create an axios instance with auth token
 */
const authAxios = () => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: testData.auth.token ? {
      'Authorization': `Bearer ${testData.auth.token}`
    } : {}
  });
  return instance;
};

/**
 * User API Tests
 */
describe('User API', () => {
  // Test user registration - Success case
  test('should register a new user successfully', async () => {
    const response = await axios.post(`${API_URL}/users/register`, testData.users.valid);
    
    // Assertions
    expect(response.status).toBeOneOf([200, 201]);
    expect(response.data).toHaveProperty('token');
    expect(response.data).toHaveProperty('_id');
    expect(response.data.username).toBe(testData.users.valid.username);
    expect(response.data.email).toBe(testData.users.valid.email);
    expect(response.data).not.toHaveProperty('password');
    
    // Store token for subsequent tests
    testData.auth.token = response.data.token;
    testData.auth.userId = response.data._id;
  });
  
  // Test user registration - Failure case
  test('should fail to register with invalid data', async () => {
    try {
      await axios.post(`${API_URL}/users/register`, testData.users.invalid);
      // If we reach here, the request didn't fail as expected
      fail('Registration with invalid data should have failed');
    } catch (error) {
      // Assertions
      expect(error.response.status).toBeGreaterThanOrEqual(400);
      expect(error.response.data).toHaveProperty('message');
    }
  });
  
  // Test user login - Success case
  test('should login successfully with valid credentials', async () => {
    const response = await axios.post(`${API_URL}/users/login`, {
      email: testData.users.valid.email,
      password: testData.users.valid.password
    });
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    expect(response.data).toHaveProperty('_id');
    expect(response.data.username).toBe(testData.users.valid.username);
    expect(response.data.email).toBe(testData.users.valid.email);
    
    // Update token for subsequent tests
    testData.auth.token = response.data.token;
  });
  
  // Test user login - Failure case
  test('should fail to login with wrong password', async () => {
    try {
      await axios.post(`${API_URL}/users/login`, {
        email: testData.users.valid.email,
        password: 'wrongpassword'
      });
      // If we reach here, the request didn't fail as expected
      fail('Login with wrong password should have failed');
    } catch (error) {
      // Assertions
      expect(error.response.status).toBeGreaterThanOrEqual(400);
      expect(error.response.data).toHaveProperty('message');
    }
  });
  
  // Test get user profile - Success case
  test('should get user profile with valid token', async () => {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${testData.auth.token}`
      }
    });
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.data._id).toBe(testData.auth.userId);
    expect(response.data.username).toBe(testData.users.valid.username);
    expect(response.data.email).toBe(testData.users.valid.email);
    expect(response.data).not.toHaveProperty('password');
  });
  
  // Test get user profile - Failure case
  test('should fail to get profile without token', async () => {
    try {
      await axios.get(`${API_URL}/users/profile`);
      // If we reach here, the request didn't fail as expected
      fail('Get profile without token should have failed');
    } catch (error) {
      // Assertions
      expect(error.response.status).toBeGreaterThanOrEqual(400);
      expect(error.response.data).toHaveProperty('message');
    }
  });
});

/**
 * Task API Tests
 */
describe('Task API', () => {
  // Setup: ensure we have a valid token before running task tests
  beforeAll(async () => {
    if (!testData.auth.token) {
      // Register and login to get a token
      const userData = {
        username: 'taskuser_' + Date.now(),
        email: `taskuser${Date.now()}@example.com`,
        password: 'Password123!'
      };
      
      const registerResponse = await axios.post(`${API_URL}/users/register`, userData);
      
      testData.auth.token = registerResponse.data.token;
      testData.auth.userId = registerResponse.data._id;
    }
  });
  
  // Test create task - Success case
  test('should create a new task successfully', async () => {
    const response = await axios.post(`${API_URL}/tasks`, testData.tasks.valid, {
      headers: {
        'Authorization': `Bearer ${testData.auth.token}`
      }
    });
    
    // Assertions
    expect(response.status).toBeOneOf([200, 201]);
    expect(response.data).toHaveProperty('_id');
    expect(response.data.title).toBe(testData.tasks.valid.title);
    expect(response.data.description).toBe(testData.tasks.valid.description);
    expect(response.data.user).toBe(testData.auth.userId);
    expect(response.data.completed).toBe(false);
    
    // Store task ID for subsequent tests
    testData.auth.taskId = response.data._id;
  });
  
  // Test create task - Failure case
  test('should fail to create task with invalid data', async () => {
    try {
      await axios.post(`${API_URL}/tasks`, testData.tasks.invalid, {
        headers: {
          'Authorization': `Bearer ${testData.auth.token}`
        }
      });
      // If we reach here, the request didn't fail as expected
      fail('Creating task with invalid data should have failed');
    } catch (error) {
      // Assertions
      expect(error.response.status).toBeGreaterThanOrEqual(400);
      expect(error.response.data).toHaveProperty('message');
    }
  });
  
  // Test get all tasks
  test('should get all tasks for the user', async () => {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${testData.auth.token}`
      }
    });
    
    // Assertions
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    
    const createdTask = response.data.find(task => task._id === testData.auth.taskId);
    expect(createdTask).toBeTruthy();
  });
  
  // Test update task - Success case
  test('should update a task successfully', async () => {
    const response = await axios.put(`${API_URL}/tasks/${testData.auth.taskId}`, testData.tasks.update, {
      headers: {
        'Authorization': `Bearer ${testData.auth.token}`
      }
    });
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.data._id).toBe(testData.auth.taskId);
    expect(response.data.title).toBe(testData.tasks.update.title);
    expect(response.data.description).toBe(testData.tasks.update.description);
    expect(response.data.completed).toBe(testData.tasks.update.completed);
    expect(response.data.user).toBe(testData.auth.userId);
  });
  
  // Test update task - Failure case
  test('should fail to update task with invalid ID', async () => {
    try {
      await axios.put(`${API_URL}/tasks/invalidtaskid123`, testData.tasks.update, {
        headers: {
          'Authorization': `Bearer ${testData.auth.token}`
        }
      });
      // If we reach here, the request didn't fail as expected
      fail('Updating task with invalid ID should have failed');
    } catch (error) {
      // Assertions
      expect(error.response.status).toBeGreaterThanOrEqual(400);
      expect(error.response.data).toHaveProperty('message');
    }
  });
  
  // Test delete task - Success case
  test('should delete a task successfully', async () => {
    const response = await axios.delete(`${API_URL}/tasks/${testData.auth.taskId}`, {
      headers: {
        'Authorization': `Bearer ${testData.auth.token}`
      }
    });
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('message');
  });
  
  // Test delete task - Failure case
  test('should fail to delete an already deleted task', async () => {
    try {
      await axios.delete(`${API_URL}/tasks/${testData.auth.taskId}`, {
        headers: {
          'Authorization': `Bearer ${testData.auth.token}`
        }
      });
      // If we reach here, the request didn't fail as expected
      fail('Deleting an already deleted task should have failed');
    } catch (error) {
      // Assertions
      expect(error.response.status).toBeGreaterThanOrEqual(400);
      expect(error.response.data).toHaveProperty('message');
    }
  });
  
  // Verify task is deleted
  test('should verify task is no longer in the task list', async () => {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${testData.auth.token}`
      }
    });
    
    // Assertions
    expect(response.status).toBe(200);
    const deletedTask = response.data.find(task => task._id === testData.auth.taskId);
    expect(deletedTask).toBeFalsy();
  });
});

// Add custom matchers
expect.extend({
  toBeOneOf(received, items) {
    const pass = items.includes(received);
    return {
      pass,
      message: () => `expected ${received} to be one of [${items.join(', ')}]`
    };
  }
});
