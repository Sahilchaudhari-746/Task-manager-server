const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  task: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

module.exports = Task;
