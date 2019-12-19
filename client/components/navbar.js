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
        <Link to="/">
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <img id="logo" src="/assets/images/The Record Shop.png" />
          </Menu.Item>
        </Link>

        <Link to="/albums">
          <Menu.Item
            name="albums"
            active={activeItem === 'albums'}
            onClick={this.handleItemClick}
          >
            Albums
          </Menu.Item>
        </Link>

        {this.props.isLoggedIn ? (
          <Link to="/">
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={this.props.logout}
            >
              Logout
            </Menu.Item>
          </Link>
        ) : (
          <Link to="/login">
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            >
              Login
            </Menu.Item>
          </Link>
        )}
        <Link to="/">
          <Menu.Item
            name="cart"
            active={activeItem === 'cart'}
            onClick={this.handleItemClick}
          >
            <Icon name="shopping cart" />
            {this.props.cart}
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}

export default connect(stateProps, dispatchProps)(Navbar)
