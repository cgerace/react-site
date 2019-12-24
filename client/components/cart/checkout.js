import React from 'react'
import {updateAlbumQuantity, completeCheckout, getCart} from '../../store'
import {connect} from 'react-redux'
import {Grid, Button} from 'semantic-ui-react'
import ProductTile from './product-tile'

const stateProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const dispatchProps = dispatch => {
  return {
    updateAlbumQuantity: (albumId, quantity) =>
      dispatch(updateAlbumQuantity(albumId, quantity)),
    completeCheckout: () => dispatch(completeCheckout()),
    getCart: () => dispatch(getCart())
  }
}

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleChange(event, data) {
    this.props.updateAlbumQuantity(data['data-album-id'], data.value)
  }

  handleSubmit() {
    this.props.completeCheckout()
    this.props.history.push({
      pathname: '/checkout/success/',
      state: {user: this.props.user}
    })
  }

  render() {
    let subtotal = 0

    this.props.cart.forEach(product => {
      subtotal += product.quantity * product.album.price
    })

    return (
      <div id="landing-page">
        <h1>Cart</h1>
        <hr />
        <Grid id="cart" columns={2}>
          {this.props.cart.map(product => (
            <ProductTile
              handleChange={this.handleChange}
              product={product}
              key={product.id}
            />
          ))}
        </Grid>
        <hr />
        <div id="complete-purchase">
          <h3>
            Subtotal: ${subtotal
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </h3>
          {!this.props.user.id ? (
            <p id="checkout-error">
              You must login/signup to complete this purchase
            </p>
          ) : null}
          <Button
            primary
            onClick={this.handleSubmit}
            disabled={subtotal === 0 || !this.props.user.id}
          >
            Complete Purchase
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(Checkout)
