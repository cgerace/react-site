import React from 'react'
import {connect} from 'react-redux'
import {getAlbum} from '../../store'

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
    return (
      <div>
        <h1>{this.props.album.title}</h1>
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(AlbumPage)
