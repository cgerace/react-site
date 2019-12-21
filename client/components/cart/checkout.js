import React from 'react'
import {updateAlbumQuantity} from '../../store'
import {connect} from 'react-redux'
import {Grid, Button} from 'semantic-ui-react'
import ProductTile from './product_tile'

const stateProps = state => {
  return {
    cart: state.cart
  }
}

const dispatchProps = dispatch => {
  return {
    updateAlbumQuantity: (albumId, quantity) =>
      dispatch(updateAlbumQuantity(albumId, quantity))
  }
}

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, data) {
    this.props.updateAlbumQuantity(data['data-album-id'], data.value)
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
          <h3>Subtotal: ${subtotal}</h3>
          <Button
            primary
            // onClick = {() => this.props.updateAlbumQuantity(this.props.album.id, this.state.quantity)}
            disabled
          >
            Complete Purchase
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(Checkout)
