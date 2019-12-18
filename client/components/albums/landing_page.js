import React from 'react'
import {getAlbums} from '../../store'
import ListingTab from './listing_tab'
import {connect} from 'react-redux'

const stateProps = state => {
  return {
    albums: state.albums
  }
}

const dispatchProps = dispatch => {
  return {
    getAlbums: () => dispatch(getAlbums())
  }
}

class Albums extends React.Component {
  componentDidMount() {
    this.props.getAlbums()
  }

  render() {
    console.log('This is ----->', this)
    return (
      <div>
        <h3>Welcome, Here Are Our Albums!</h3>
        <div id="table-grid">
          {this.props.albums.map(album => (
            <ListingTab key={album.id} album={album} />
          ))}
        </div>
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(Albums)
