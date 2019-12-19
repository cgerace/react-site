const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Active', 'Completed'),
    allowNull: false,
    defaultValue: 'Active'
  }
})

module.exports = Order
