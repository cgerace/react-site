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

module.exports = Order

Order.getUsersCart = async userId => {
  try {
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
  } catch (error) {
    console.error(error)
  }
}

Order.removeAlbum = async albumId => {
  console.log('Order is ----->', Order)
  try {
    const orders = await Order.findAll({
      where: {
        status: 'Active'
      },
      include: [
        {
          model: OrderProduct,
          where: {
            albumId
          }
        }
      ]
    })

    console.log('The orders with this product are ----->', orders)

    if (orders) {
      orders.forEach(order => {
        order.orderProducts.forEach(async product => {
          console.log('The product is ---->', product)
          await product.destroy()
        })
      })
    }
  } catch (error) {
    console.error(error)
  }
}
