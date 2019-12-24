const router = require('express').Router()
const {Order, OrderProduct, Album} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      let cart = await Order.getUsersCart(req.user.id)

      if (req.session.cart && req.session.cart.length > 0) {
        let products = {}

        cart.orderProducts.forEach(product => {
          products[product.albumId] = product
        })

        console.log('The session cart is ----->', req.session.cart)

        console.log('The products object is --->', products)

        req.session.cart.forEach(async item => {
          console.log('The album is -----', item)
          console.log(
            'Is the album in the products hash ----->',
            products[item.albumId]
          )
          if (products[item.albumId]) {
            console.log(
              'The quantity before is ---->',
              products[item.albumId].quantity
            )
            products[item.albumId].quantity += +item.quantity
            await products[item.albumId].save()
            console.log(
              'The quantity after is ---->',
              products[item.albumId].quantity
            )
          } else {
            await OrderProduct.create({
              orderId: cart.id,
              albumId: item.albumId,
              quantity: item.quantity,
              orderPrice: item.album.price
            })
          }
        })
        cart = await Order.getUsersCart(req.user.id)

        req.session.cart = []
      }

      console.log('The cart.orderProducts are --->', cart.orderProducts)

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

      req.session.cart.push(item)
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

      cart.orderProducts.forEach(product => {
        product.album.updateStock(product.quantity)
        if (product.album.stock === 0) {
          Order.removeAlbum(product.album.id)
        }
      })

      const newCart = await Order.create({
        userId: req.user.id
      })

      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})
