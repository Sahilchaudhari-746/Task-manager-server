const express = require('express');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/tasksController');
const router = express.Router();

router.post('/tasks', getAllTasks);
router.post('/add-tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
