const Sequelize = require('sequelize')
const db = require('../db')
const OrderProduct = require('./orderProduct')

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
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 35.0
  }
})

module.exports = Album

Album.prototype.updateStock = async function(quantity) {
  try {
    this.stock -= +quantity
    await this.save()

    return this
  } catch (error) {
    console.log(error)
  }
}
