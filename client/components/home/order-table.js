import React from 'react'
import {Table} from 'semantic-ui-react'
import ProductRow from './product-row'

const OrderTable = props => {
  const order = props.order
  const user = props.user

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
        {order.orderProducts.map(product => (
          <ProductRow key={product.id} product={product} />
        ))}
      </Table.Body>
    </Table>
  )
}

export default OrderTable
