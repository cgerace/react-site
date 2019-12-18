import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALBUM = 'GOT_ALBUM'
const REMOVE_ALBUM = 'REMOVE_ALBUM'

/**
 * ACTION CREATORS
 */
const gotAlbum = album => ({
  type: GOT_ALBUM,
  album
})
export const removeAlbum = () => ({
  type: REMOVE_ALBUM
})

/**
 * THUNK CREATORS
 */
export const getAlbum = id => async dispatch => {
  try {
    const res = await axios.get(`/api/albums/${id}`)
    dispatch(gotAlbum(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export const albumReducer = (album = {}, action) => {
  switch (action.type) {
    case GOT_ALBUM:
      return action.album
    case REMOVE_ALBUM:
      return {}
    default:
      return album
  }
}
