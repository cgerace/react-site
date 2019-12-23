import React from 'react'
import {Link} from 'react-router-dom'
import {Grid} from 'semantic-ui-react'

const ListingTab = props => {
  const album = props.album

  return (
    <Grid.Column className="album-listing">
      <img className="album-listing" src={album.imageUrl} />
      <div>
        <Link to={`/albums/${album.id}`}>Buy Album</Link>
      </div>
      <h1>{album.title}</h1>
      <h3>{album.artist}</h3>
    </Grid.Column>
  )
}

export default ListingTab
