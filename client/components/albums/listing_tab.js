import React from 'react'
import {Link} from 'react-router-dom'

const ListingTab = props => {
  const album = props.album

  return (
    <div>
      <h1>{album.title}</h1>
      <h3>{album.artist}</h3>
      <img src={album.imageUrl} />
      <Link to={`/albums/${album.id}`} state={album}>
        {' '}
        Buy Album{' '}
      </Link>
    </div>
  )
}

export default ListingTab
