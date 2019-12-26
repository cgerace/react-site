const router = require('express').Router()
const {Album, OrderProduct, Order} = require('../db/models')
const isAdmin = require('./admin')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const albums = await Album.findAll()
    res.json(albums)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id)
    if (album) {
      res.json(album)
    } else {
      res.status(404).send('404: Page Not Found')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id/price', isAdmin(), async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id)
    if (album) {
      album.price = req.body.price
      await album.save()

      const activeOrders = await Order.findAll({
        where: {
          status: 'Active'
        },
        include: [{model: OrderProduct}]
      })

      if (activeOrders) {
        activeOrders.forEach(order => {
          if (order.orderProducts) {
            order.orderProducts.forEach(async product => {
              if (+product.albumId === +req.params.id) {
                product.orderPrice = req.body.price
                await product.save()
              }
            })
          }
        })
      }

      res.json(album)
    } else {
      res.status(404).send('404: Page Not Found')
    }
  } catch (err) {
    next(err)
  }
})
