import React from 'react'
import {connect} from 'react-redux'
import {getAlbum} from '../../store'
import {List, Dropdown, Button} from 'semantic-ui-react'

const stateProps = state => {
  return {
    album: state.album
  }
}

const dispatchProps = dispatch => {
  return {
    getAlbum: id => dispatch(getAlbum(id))
  }
}

class AlbumPage extends React.Component {
  componentDidMount() {
    this.props.getAlbum(this.props.match.params.id)
  }

  render() {
    const options = [
      {key: 1, text: '1', value: 1},
      {key: 2, text: '2', value: 2},
      {key: 3, text: '3', value: 3},
      {key: 4, text: '4', value: 4}
    ]

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
          </List>
          <Dropdown placeholder="Quantity" fluid selection options={options} />
          <Button id="add-to-cart" primary>
            Add to Cart
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(AlbumPage)
