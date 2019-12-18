const router = require('express').Router()
module.exports = router

router.get('/test', (req, res, next) => {
  console.lot('Hello!')
  res.json('We did it!')
})

router.use('/users', require('./users'))
router.use('/albums', require('./albums'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
