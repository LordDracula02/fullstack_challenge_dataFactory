import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';

// Create context
export const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'USER_LOADED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user
  const loadUser = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthToken(token);
      try {
        console.log('Loading user with token:', token);
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`);
        console.log('User profile loaded:', res.data);
        dispatch({ type: 'USER_LOADED', payload: res.data });
      } catch (err) {
        console.error('Error loading user:', err.response?.data || err.message);
        dispatch({ type: 'AUTH_ERROR', payload: err.response?.data?.message || 'Authentication error' });
      }
    } else {
      console.log('No token found, not authenticated');
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/register`, formData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response?.data?.message || 'Registration failed',
      });
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      console.log('Attempting login with:', formData);
      const res = await axios.post(`${API_BASE_URL}/api/users/login`, formData);
      console.log('Login response:', res.data);
      
      // Set token in localStorage and axios headers first
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      
      // Then update state
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      
      // Wait a moment before loading user to ensure token is set
      setTimeout(() => {
        loadUser();
      }, 100);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response?.data?.message || 'Invalid credentials',
      });
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  // Check if user is logged in on first load
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
