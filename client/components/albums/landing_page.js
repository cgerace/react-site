import React from 'react'
import {getAlbums, removeAlbum} from '../../store'
import ListingTab from './listing_tab'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'

const stateProps = state => {
  return {
    albums: state.albums
  }
}

const dispatchProps = dispatch => {
  return {
    getAlbums: () => dispatch(getAlbums()),
    removeAlbum: () => dispatch(removeAlbum())
  }
}

class Albums extends React.Component {
  componentDidMount() {
    this.props.getAlbums()
    this.props.removeAlbum()
  }

  render() {
    let tempRow = []
    let albums = []

    for (let i = 0; i < this.props.albums.length; i++) {
      tempRow.push(this.props.albums[i])
      if (tempRow.length >= 3 || i === this.props.albums.length - 1) {
        albums.push(tempRow)
        tempRow = []
      }
    }

    return (
      <div id="landing-page">
        <h1>Albums</h1>
        <hr />
        <Grid columns={3} divided>
          {albums.map((albumsRow, idx) => (
            <Grid.Row key={idx}>
              {albumsRow.map(album => (
                <ListingTab key={album.id} album={album} />
              ))}
            </Grid.Row>
          ))}
        </Grid>
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(Albums)
