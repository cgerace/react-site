const router = require('express').Router()
const {User, Order, OrderProduct, Album} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.json(user)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id/orders', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          where: {
            status: 'Complete'
          },
          include: [
            {
              model: OrderProduct,
              include: [{model: Album}]
            }
          ]
        }
      ]
    })

    if (user.orders) {
      res.json(user.orders)
    } else {
      res.json([])
    }
  } catch (error) {
    next(error)
  }
})
