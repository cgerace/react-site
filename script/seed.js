'use strict'

const db = require('../server/db')
const {User, Album} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '12345'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '12345'
    })
  ])

  const albums = await Promise.all([
    Album.create({
      title: 'Blood on the Tracks',
      artist: 'Bob Dylan',
      year: 1975,
      genre: 'Folk Rock',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/f/fa/Bob_Dylan_-_Blood_on_the_Tracks.jpg'
    }),
    Album.create({
      title: 'Pet Sounds',
      artist: 'the Beach Boys',
      year: 1966,
      genre: 'Psychedelic pop',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/b/bb/PetSoundsCover.jpg'
    }),
    Album.create({
      title: 'Hunky Dory',
      artist: 'David Bowie',
      year: 1971,
      genre: 'Art rock',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/4/40/David_Bowie_-_Hunky_Dory.jpg'
    })
  ])

  console.log(`seeded ${users.length} users, and ${albums.length} albums`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
