const express = require('express');
const taskRoutes = require('./routes/taskRoutes'); // Make sure the path is 
const authRoutes = require('./routes/authRoutes')
const app = express();
const cors = require('cors'); 

// Use CORS with specific origin
app.use(cors({
    origin: ['http://localhost:3000', 'https://task-manager-rose-chi-38.vercel.app']
}));

app.use(express.json()); // Middleware for JSON body parsing

// Use task routes
app.use('/', taskRoutes);

app.use('/auth', authRoutes);
// Start the server
app.listen(process.env.PORT || 5000, () => { // Use process.env.PORT for serverless platforms
    console.log(`Server is running `);
});
