const User = require('./user')
const Album = require('./album')
const Order = require('./order')
const OrderProduct = require('./orderProduct')

User.hasMany(Order)
Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Album)

module.exports = {
  User,
  Album,
  Order,
  OrderProduct
}
