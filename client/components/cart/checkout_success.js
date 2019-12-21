import React from 'react'

const CheckoutSuccess = props => {
  const user = props.location.state.user

  console.log('Props are ', props)

  return (
    <div id="checkout-success">
      <h1>Thank you for your purchase!</h1>
      <h2>We have sent a confirmation email to {user.email}</h2>
    </div>
  )
}

export default CheckoutSuccess
