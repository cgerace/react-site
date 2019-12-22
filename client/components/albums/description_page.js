import React from 'react'
import {connect} from 'react-redux'
import {getAlbum, addAlbumToCart, updateAlbumQuantity} from '../../store'
import {List, Dropdown, Button} from 'semantic-ui-react'

const stateProps = state => {
  return {
    album: state.album,
    cart: state.cart
  }
}

const dispatchProps = dispatch => {
  return {
    getAlbum: id => dispatch(getAlbum(id)),
    addToCart: (album, quantity) => dispatch(addAlbumToCart(album, quantity)),
    updateAlbumQuantity: (albumId, quantity) =>
      dispatch(updateAlbumQuantity(albumId, quantity))
  }
}

class AlbumPage extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getAlbum(this.props.match.params.id)
    window.scrollTo(0, 0)
  }

  handleChange(event, {value}) {
    this.setState({
      quantity: value
    })
  }

  render() {
    let options = []

    for (let i = 0; i <= this.props.album.stock; i++) {
      options.push({
        key: i,
        text: i.toString(),
        value: i
      })
    }

    let button

    if (this.props.album.stock === 0) {
      button = (
        <Button id="add-to-cart" primary disabled>
          Out of Stock
        </Button>
      )
    } else if (
      this.props.cart.some(album => album.albumId === this.props.album.id)
    ) {
      button = (
        <Button
          id="add-to-cart"
          primary
          onClick={() =>
            this.props.updateAlbumQuantity(
              this.props.album.id,
              this.state.quantity
            )
          }
          disabled={this.state.quantity === ''}
        >
          Update Cart
        </Button>
      )
    } else {
      button = (
        <Button
          id="add-to-cart"
          primary
          onClick={() =>
            +this.state.quantity > 0
              ? this.props.addToCart(this.props.album, this.state.quantity)
              : console.log('Not adding a product')
          }
          disabled={this.state.quantity === '' || +this.state.quantity === 0}
        >
          Add to Cart
        </Button>
      )
    }

    return (
      <div id="album-page">
        <div id="album-display">
          <img src={this.props.album.imageUrl} />
        </div>
        <div id="album-info">
          <List>
            <List.Item>
              <strong>Title:</strong> {this.props.album.title}
            </List.Item>
            <List.Item>
              <strong>Artist:</strong> {this.props.album.artist}
            </List.Item>
            <List.Item>
              <strong>Year:</strong> {this.props.album.year}
            </List.Item>
            <List.Item>
              <strong>Genre:</strong> {this.props.album.genre}
            </List.Item>
            <List.Item>
              <strong>Price:</strong> ${this.props.album.price}
            </List.Item>
          </List>
          <Dropdown
            placeholder="Quantity"
            fluid
            selection
            options={options}
            onChange={this.handleChange}
          />
          {button}
        </div>
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(AlbumPage)
