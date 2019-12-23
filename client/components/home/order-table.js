import React from 'react'
import {Table} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const OrderTable = props => {
  const order = props.order
  const user = props.user

  console.log('Order is ----->', order)

  let subtotal = 0

  order.orderProducts.forEach(product => {
    subtotal += product.quantity * product.orderPrice
  })

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Order Placed:{' '}
            {order.updatedAt.slice(0, order.updatedAt.indexOf('T'))}
          </Table.HeaderCell>
          <Table.HeaderCell>Total: ${subtotal.toFixed(2)}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {order.orderProducts.map(product => {
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
        })}
      </Table.Body>
    </Table>
  )
}

export default OrderTable
