import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import { List, Typography, Box, CircularProgress, Alert } from '@mui/material';

const TaskList = () => {
  const { tasks, getTasks, loading, error } = useContext(TaskContext);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      {tasks && tasks.length > 0 ? (
        <List sx={{ 
          width: '100%', 
          bgcolor: 'background.paper', 
          p: 0,
          borderRadius: 1,
          overflow: 'hidden',
          maxHeight: '60vh',
          overflowY: 'auto'
        }}>
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </List>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '200px',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1
        }}>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            No tasks found. Add a task to get started!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TaskList;
