import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Icon} from 'semantic-ui-react'

const stateProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart.length
  }
}

const dispatchProps = dispatch => {
  return {
    logout() {
      dispatch(logout())
    }
  }
}

class Navbar extends React.Component {
  state = {}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state

    return (
      <Menu>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <img id="logo" src="/assets/images/The Record Shop.png" />
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/albums"
          name="albums"
          active={activeItem === 'albums'}
          onClick={this.handleItemClick}
        >
          Albums
        </Menu.Item>

        {this.props.isLoggedIn ? (
          <Menu.Item
            as={Link}
            to="/"
            name="logout"
            active={activeItem === 'logout'}
            onClick={this.props.logout}
          >
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          >
            Login
          </Menu.Item>
        )}
        <Menu.Item
          as={Link}
          to="/cart"
          name="cart"
          active={activeItem === 'cart'}
          onClick={this.handleItemClick}
        >
          <Icon name="shopping cart" />
          {this.props.cart}
        </Menu.Item>
      </Menu>
    )
  }
}

export default connect(stateProps, dispatchProps)(Navbar)
