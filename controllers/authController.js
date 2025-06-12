const pool = require('../config/db');
const bcrypt = require('bcrypt');

// SIGN UP: Register a new user
const signUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await pool.query('SELECT * FROM userstask WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insert user
        const newUser = await pool.query(
            'INSERT INTO userstask (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            [email, password_hash]
        );

        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
    } catch (err) {
        console.error('Error during signup:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// SIGN IN: Authenticate user
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM userstask WHERE email = $1', [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = userResult.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (err) {
        console.error('Error during signin:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    signUp,
    signIn,
};
