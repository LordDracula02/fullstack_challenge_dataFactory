import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';

const Home = () => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Home component - Auth state:', { isAuthenticated, loading, user });
    
    if (!loading && !isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      navigate('/login');
    } else if (isAuthenticated) {
      console.log('User authenticated, staying on home page');
    }
  }, [isAuthenticated, loading, navigate, user]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 500, 
            color: 'primary.main',
            mb: 3 
          }}
        >
          Task Manager
        </Typography>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', maxWidth: '800px', mx: 'auto' }}>
            <TaskForm />
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', maxWidth: '800px', mx: 'auto' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontWeight: 500,
                  mb: 2,
                  pb: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}
              >
                My Tasks
              </Typography>
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <TaskList />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
