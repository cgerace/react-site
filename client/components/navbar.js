import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu} from 'semantic-ui-react'

const stateProps = state => {
  return {
    isLoggedIn: !!state.user.id
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
      </Menu>
    )
  }
}

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     {/* <h1 id = 'navbar'>The Record Shop</h1> */}
//     <img src = '/assets/images/The Record Shop.png'/>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//           <Link to="/albums">Albums</Link>
//         </div>
//       ) : (
//         <div>
//           <Link to="/albums">Albums</Link>
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

export default connect(stateProps, dispatchProps)(Navbar)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
