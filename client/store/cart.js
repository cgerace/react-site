import axios from 'axios'

const GOT_CART = 'GOT_CART'

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

export const getCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    console.log('The cart is ----->', res.data)
    dispatch(gotCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const cartReducer = (cart = [], action) => {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    default:
      return cart
  }
}
