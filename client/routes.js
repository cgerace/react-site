import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Albums, AlbumPage, UserHome, Checkout} from './components'
import {me, getCart} from './store'

const stateProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const dispatchProps = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getCart())
    }
  }
}

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/albums" component={Albums} />
        <Route path="/albums/:id" component={AlbumPage} />
        <Route path="/cart" component={Checkout} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/" component={UserHome} />
          </Switch>
        )}
        <Route component={Login} />
      </Switch>
    )
  }
}

export default withRouter(connect(stateProps, dispatchProps)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
