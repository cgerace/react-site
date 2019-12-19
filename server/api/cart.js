const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'Active'
        },
        include: [{model: OrderProduct}]
      })
      res.json(cart.orderProducts)
    } else {
      if (!req.session.cart) {
        req.session.cart = []
      }
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})
