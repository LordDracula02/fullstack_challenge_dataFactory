const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes in this router
router.use(protect);

// Get all tasks and create a new task
router.route('/')
  .get(getTasks)
  .post(createTask);

// Update and delete task
router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
