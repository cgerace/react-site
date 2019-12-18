const Sequelize = require('sequelize')
const db = require('../db')

const Album = db.define('album', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  genre: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Album
