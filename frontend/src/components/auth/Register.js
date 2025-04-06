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

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [alertError, setAlertError] = useState('');

  const { username, email, password, password2 } = user;

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

    if (!username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (password !== password2) {
      errors.password2 = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      register({
        username,
        email,
        password,
      });
      
      // Set a timeout to reset loading state if registration takes too long
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
            Register Account
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={onChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              value={password}
              onChange={onChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="new-password"
              value={password2}
              onChange={onChange}
              error={!!formErrors.password2}
              helperText={formErrors.password2}
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
                  <span>Creating Account...</span>
                </Box>
              ) : (
                'Register'
              )}
            </Button>
            {isLoading && (
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                This may take up to 10 seconds on the first registration due to server warm-up
              </Typography>
            )}
            <Box sx={{ textAlign: 'center' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
