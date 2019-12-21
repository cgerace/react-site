const router = require('express').Router()
const {Album} = require('../db/models')
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
