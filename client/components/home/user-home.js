import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Table, Menu, Icon, Label} from 'semantic-ui-react'
import axios from 'axios'
import OrderTable from './order-table'
import {getCart} from '../../store'

const stateProps = state => {
  return {
    user: state.user,
    cart: state.user
  }
}

const dispatchProps = dispatch => {
  return {
    getCart: () => dispatch(getCart())
  }
}

class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      orders: []
    }
  }

  async componentDidMount() {
    this.props.getCart()
    const res = await axios.get(`/api/users/${this.props.user.id}/orders`)
    this.setState({
      orders: res.data
    })
  }

  render() {
    const user = this.props.user
    const orders = this.state.orders

    return (
      <div id="user-home">
        <h1>Welcome back, {this.props.user.name}!</h1>
        <h3>Order History:</h3>
        {orders.map(order => (
          <OrderTable key={order.id} user={this.props.user} order={order} />
        ))}
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(UserHome)
