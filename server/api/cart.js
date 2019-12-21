const router = require('express').Router()
const {Order, OrderProduct, Album} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.getUsersCart(req.user.id)
      res.json(cart.orderProducts || [])
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

router.post('/add', async (req, res, next) => {
  try {
    let item
    const album = req.body.album
    const quantity = req.body.quantity

    if (req.user) {
      const cart = await Order.getUsersCart(req.user.id)
      const orderProduct = await OrderProduct.create({
        orderId: cart.id,
        albumId: album.id,
        quantity: quantity,
        orderPrice: album.price
      })

      item = await OrderProduct.findByPk(orderProduct.id, {
        include: [{model: Album}]
      })
    } else {
      if (!req.session.cart) {
        req.session.cart = []
      }

      item = {
        albumId: album.id,
        quantity: quantity,
        orderPrice: album.price,
        album
      }
    }
    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.post('/update/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.getUsersCart(req.user.id)

      const album = await OrderProduct.findOne({
        where: {
          orderId: cart.id,
          albumId: req.params.id
        },
        include: [{model: Album}]
      })

      if (+req.body.quantity === 0) {
        await album.destroy()
      } else {
        album.quantity = req.body.quantity
        await album.save()
      }
      res.json(album)
    } else {
      req.session.cart.forEach(album => {
        if (album.albumId === req.params.id) {
          album.quantity = req.body.quantity
        }
      })

      res.json('Heyooo')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.getUsersCart(req.user.id)
      cart.status = 'Complete'

      await cart.save()

      const newCart = await Order.create({
        userId: req.user.id
      })

      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})
