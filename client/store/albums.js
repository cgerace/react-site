import axios from 'axios'
import history from '../history'

const GOT_ALBUMS = 'GOT_ALBUMS'

const gotAlbums = albums => ({
  type: GOT_ALBUMS,
  albums
})

export const getAlbums = () => async dispatch => {
  try {
    const res = await axios.get('/api/albums')
    dispatch(gotAlbums(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const albumsReducer = (albums = [], action) => {
  switch (action.type) {
    case GOT_ALBUMS:
      return action.albums
    default:
      return albums
  }
}
