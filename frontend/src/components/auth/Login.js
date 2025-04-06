import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [alertError, setAlertError] = useState('');

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(false);
      navigate('/');
    }

    if (error) {
      setIsLoading(false);
      setAlertError(error);
      setTimeout(() => {
        clearErrors();
        setAlertError('');
      }, 5000);
    }
  }, [isAuthenticated, error, navigate, clearErrors]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    
    // Clear field-specific error when user types
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Submitting login form with:', { email, password });
      setIsLoading(true);
      login({
        email,
        password,
      });
      
      // Set a timeout to reset loading state if login takes too long
      setTimeout(() => {
        setIsLoading(false);
      }, 15000); // 15 seconds timeout as a fallback
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Account Login
          </Typography>
          
          {alertError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {alertError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={onSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  <span>Signing In...</span>
                </Box>
              ) : (
                'Sign In'
              )}
            </Button>
            {isLoading && (
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                This may take up to 10 seconds on the first login due to server warm-up
              </Typography>
            )}
            <Box sx={{ textAlign: 'center' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Don't have an account? Sign up
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
