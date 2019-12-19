'use strict'

const db = require('../server/db')
const {User, Album} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '12345',
      name: 'Cody'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '12345',
      name: 'Murphy'
    }),
    User.create({
      email: 'brian@email.com',
      password: '12345',
      name: 'Brian'
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
    }),
    Album.create({
      title: 'Astral Weeks',
      artist: 'Van Morrison',
      year: 1968,
      genre: 'Folk rock',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/f/f7/VanMorrisonAstralWeeks.jpg'
    }),
    Album.create({
      title: 'Arthur (Or the Decline and Fall of the British Empire)',
      artist: 'the Kinks',
      year: 1969,
      genre: 'Rock',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/b/bc/The_kinks_arthur_album.jpg'
    }),
    Album.create({
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      genre: 'Progressive rock',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png'
    }),
    Album.create({
      title: 'Bryter Layter',
      artist: 'Nick Drake',
      year: 1971,
      genre: 'Folk',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/1/17/Bryter_Layter.jpg'
    }),
    Album.create({
      title: 'Rust Never Sleeps',
      artist: 'Neil Young',
      year: 1979,
      genre: 'Acoustic',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/4/47/Neil_Young_Rust_Never_Sleeps.jpg'
    }),
    Album.create({
      title: 'Illinois',
      artist: 'Sufjan Stevens',
      year: 2005,
      genre: 'Folk',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/0/01/Sufjan_Stevens_-_Illinois.jpg'
    }),
    Album.create({
      title: 'The Band',
      artist: 'The Band',
      year: 1969,
      genre: 'Roots rock',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/7/74/The_Band_%28album%29_coverart.jpg'
    }),
    Album.create({
      title: 'Funeral',
      artist: 'Arcade Fire',
      year: 2004,
      genre: 'Indie rock',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/2/25/ArcadeFireFuneralCover.jpg'
    }),
    Album.create({
      title: 'More Songs About Buildings and Food',
      artist: 'Talking Heads',
      year: 1978,
      genre: 'New wave',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/7/75/TalkingHeadsMoreSongsAboutBuildingsandFood.jpg'
    }),
    Album.create({
      title: 'Songs of Leonard Cohen',
      artist: 'Leonard Cohen',
      year: 1967,
      genre: 'Contemporary folk',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/4/4c/SongsOfLeonardCohen.jpeg'
    }),
    Album.create({
      title: 'The Beatles',
      artist: 'The Beatles',
      year: 1968,
      genre: 'Rock',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/2/20/TheBeatles68LP.jpg'
    }),
    Album.create({
      title: 'Since I Left You',
      artist: 'the Avalanches',
      year: 2000,
      genre: 'Plunderphonics',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/9/97/Since_i_left_you.jpg'
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
