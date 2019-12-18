import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * CONTAINER
 */
const stateProps = state => {
  return {
    email: state.user.email
  }
}

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

export default connect(stateProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
