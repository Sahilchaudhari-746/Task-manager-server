const { Pool } = require('pg');

// Initialize pool with PostgreSQL connection details
const pool = new Pool({
    user: 'postgres',            // Replace with your PostgreSQL username
    host: 'localhost',           // Host where PostgreSQL server is running
    database: 'finance_management', // Database name
    password: 'sahil@2003',      // Replace with your PostgreSQL password
    port: 5433,                  // Port number (default is 5432, but you are using 5433)
});

// Export the pool for use in other parts of the application
module.exports = pool;
