import React from 'react'
import {Grid, List, Dropdown, Image} from 'semantic-ui-react'

const ProductTile = props => {
  const product = props.product

  let options = []

  for (let i = 0; i <= product.album.stock; i++) {
    options.push({
      key: i,
      text: `Qty: ${i.toString()}`,
      value: i
    })
  }

  return (
    <Grid.Row>
      <Grid.Column>
        <Image src={product.album.imageUrl} className="cart-product-image" />
      </Grid.Column>
      <Grid.Column>
        <List id="checkout-details">
          <List.Item>{product.album.title}</List.Item>
          <List.Item>{product.album.artist}</List.Item>
          <List.Item>
            <Dropdown
              id="checkout-dropdown"
              data-album-id={product.album.id}
              fluid
              selection
              options={options}
              onChange={props.handleChange}
              defaultValue={product.quantity}
            />
          </List.Item>
          <List.Item>${product.album.price}</List.Item>
        </List>
      </Grid.Column>
    </Grid.Row>
  )
}

export default ProductTile
