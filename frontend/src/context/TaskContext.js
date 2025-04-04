import { createContext, useReducer } from 'react';
import axios from 'axios';

// Create context
export const TaskContext = createContext();

// Initial state
const initialState = {
  tasks: [],
  current: null,
  loading: true,
  error: null,
};

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false,
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
        loading: false,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
        loading: false,
      };
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null,
      };
    case 'TASK_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

// Create provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Get all tasks
  const getTasks = async () => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.get('http://localhost:5000/api/tasks');
      dispatch({ type: 'GET_TASKS', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Error fetching tasks',
      });
    }
  };

  // Add task
  const addTask = async (task) => {
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', task);
      dispatch({ type: 'ADD_TASK', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Error adding task',
      });
    }
  };

  // Update task
  const updateTask = async (task) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, task);
      dispatch({ type: 'UPDATE_TASK', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Error updating task',
      });
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Error deleting task',
      });
    }
  };

  // Set current task
  const setCurrent = (task) => {
    dispatch({ type: 'SET_CURRENT', payload: task });
  };

  // Clear current task
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getTasks,
        addTask,
        updateTask,
        deleteTask,
        setCurrent,
        clearCurrent,
        clearErrors,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
