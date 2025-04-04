import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
} from '@mui/material';

const TaskForm = () => {
  const { addTask, updateTask, current, clearCurrent } = useContext(TaskContext);

  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (current !== null) {
      setTask({
        title: current.title,
        description: current.description || '',
      });
    } else {
      setTask({
        title: '',
        description: '',
      });
    }
  }, [current]);

  const { title, description } = task;

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    
    // Clear field-specific error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    let isValid = true;

    if (!title.trim()) {
      validationErrors.title = 'Title is required';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (current === null) {
        addTask(task);
      } else {
        updateTask({
          ...current,
          title,
          description,
        });
        clearCurrent();
      }

      // Clear form
      setTask({
        title: '',
        description: '',
      });
    }
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
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
        {current ? 'Edit Task' : 'Add Task'}
      </Typography>
      <Box component="form" onSubmit={onSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Task Title"
          name="title"
          value={title}
          onChange={onChange}
          error={!!errors.title}
          helperText={errors.title}
          inputProps={{ maxLength: 100 }} // Limit title length
        />
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          value={description}
          onChange={onChange}
          multiline
          rows={3}
          inputProps={{ 
            maxLength: 500, // Limit description length
            style: { wordBreak: 'break-word' } // Ensure text wraps properly
          }}
          FormHelperText={
            <Typography variant="caption" color="textSecondary">
              {description.length}/500 characters
            </Typography>
          }
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            {current ? 'Update Task' : 'Add Task'}
          </Button>
          {current && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearAll}
              sx={{ ml: 2 }} // Add margin for better spacing
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default TaskForm;
