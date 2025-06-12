const pool = require('../config/db');

// CREATE: Add a new task
const createTask = async (req, res) => {
    const { task, userId } = req.body;
    try {
        const newTask = await pool.query(
            'INSERT INTO Tasks (task, user_id) VALUES ($1, $2) RETURNING *',
            [task, userId]
        );
        res.json(newTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET ALL for ADMIN or DEBUGGING (optional)
const getAllTasks = async (req, res) => {
    const userId = parseInt(req.body.userId, 10); // ✅ Read from body, not query
    console.log(userId);

    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// READ: Get all tasks for a specific user
const getTasks = async (req, res) => {
    const userId = parseInt(req.query.userId, 10);
    try {
        const allTasks = await pool.query(
            'SELECT * FROM Tasks WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        res.json(allTasks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

// UPDATE: Update a task (make sure it belongs to the user)
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { task, status, userId } = req.body;
    try {
        const updatedTask = await pool.query(
            'UPDATE Tasks SET task = $1, status = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [task, status, id, userId]
        );
        if (updatedTask.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
        }
        res.json(updatedTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

// DELETE: Delete a task (make sure it belongs to the user)
const deleteTask = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const deletedTask = await pool.query(
            'DELETE FROM Tasks WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        if (deletedTask.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getAllTasks,
};
