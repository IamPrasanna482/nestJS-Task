const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with your database connection details
const sequelize = new Sequelize('UMS', 'postgres', 'Max@bravo1', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define your model
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  }
});

// Assuming you've already synchronized your models with the database
// You can call findAll() to get all rows from the User table
User.findAll().then(users => {
  console.log(users);
}).catch(err => {
  console.error('Unable to fetch users:', err);
});
