import axios from 'axios'

const GOT_CART = 'GOT_CART'
const ADD_ALBUM = 'ADD_ALBUM'
const UPDATE_ALBUM = 'UPDATE_ALBUM'
const REMOVE_ALBUM = 'REMOVE_ALBUM'
const CLEAR_CART = 'CLEAR_CART'

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const addAlbum = album => ({
  type: ADD_ALBUM,
  album
})

const updateAlbum = album => ({
  type: UPDATE_ALBUM,
  album
})

const removeAlbum = album => ({
  type: REMOVE_ALBUM,
  album
})

const clearCart = () => ({
  type: CLEAR_CART
})

export const getCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(gotCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const addAlbumToCart = (album, quantity) => async dispatch => {
  try {
    const res = await axios.post('/api/cart/add', {album, quantity})
    dispatch(addAlbum(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateAlbumQuantity = (albumId, quantity) => async dispatch => {
  try {
    const res = await axios.post(`/api/cart/update/${albumId}`, {quantity})
    if (quantity > 0) {
      dispatch(updateAlbum(res.data))
    } else {
      dispatch(removeAlbum(res.data))
    }
  } catch (error) {
    console.error(error)
  }
}

export const completeCheckout = () => async dispatch => {
  try {
    const res = await axios.post('/api/cart/checkout')
    dispatch(clearCart())
  } catch (error) {
    console.error(error)
  }
}

export const cartReducer = (cart = [], action) => {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case ADD_ALBUM:
      return [...cart, action.album]
    case UPDATE_ALBUM:
      return cart.map(album => {
        if (album.albumId === action.album.albumId) return action.album
        else return album
      })
    case REMOVE_ALBUM:
      return cart.filter(album => album.albumId !== action.album.albumId)
    case CLEAR_CART:
      return []
    default:
      return cart
  }
}
