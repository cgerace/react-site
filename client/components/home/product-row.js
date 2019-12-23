import React from 'react'
import {Table} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const ProductRow = props => {
  const product = props.product

  return (
    <Table.Row key={product.id}>
      <Table.Cell>
        <Link to={`/albums/${product.album.id}`}>
          {' '}
          <img src={product.album.imageUrl} />
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link to={`/albums/${product.album.id}`}>
          {product.album.title} - {product.album.artist}
          <br />
        </Link>
        Qty: {product.quantity}
        <br />
        Price: {product.orderPrice}
      </Table.Cell>
    </Table.Row>
  )
}

export default ProductRow
