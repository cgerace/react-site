import axios from 'axios'
import history from '../history'

const GOT_ALBUM = 'GOT_ALBUM'
const UNMOUNT_ALBUM = 'UNMOUNT_ALBUM'

const gotAlbum = album => ({
  type: GOT_ALBUM,
  album
})
export const unmountAlbum = () => ({
  type: UNMOUNT_ALBUM
})

export const getAlbum = id => async dispatch => {
  try {
    const res = await axios.get(`/api/albums/${id}`)
    dispatch(gotAlbum(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const albumReducer = (album = {}, action) => {
  switch (action.type) {
    case GOT_ALBUM:
      return action.album
    case UNMOUNT_ALBUM:
      return {}
    default:
      return album
  }
}
