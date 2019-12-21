const Sequelize = require('sequelize')
const db = require('../db')
const OrderProduct = require('./orderProduct')
const Album = require('./album')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Active', 'Complete'),
    allowNull: false,
    defaultValue: 'Active'
  }
})

Order.getUsersCart = async userId => {
  const cart = await Order.findOne({
    where: {
      userId,
      status: 'Active'
    },
    include: [
      {
        model: OrderProduct,
        include: [{model: Album}]
      }
    ]
  })

  return cart
}

module.exports = Order
