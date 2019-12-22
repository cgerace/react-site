const router = require('express').Router()
const {User, Order} = require('../db/models')
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
    const orders = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          where: {
            status: 'Complete'
          }
        }
      ]
    })

    if (orders) {
      res.json(orders)
    }
  } catch (error) {
    next(error)
  }
})
