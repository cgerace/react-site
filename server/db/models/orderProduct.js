const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')

const OrderProduct = db.define('orderProduct', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  albumId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  orderPrice: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0.0
    }
  }
})

module.exports = OrderProduct
