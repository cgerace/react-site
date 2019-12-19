import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {Button, Form} from 'semantic-ui-react'

const stateProps = state => {
  return {
    user: state.user
  }
}

const dispatchProps = dispatch => {
  return {
    auth: (name, email, password, method) =>
      dispatch(auth(name, email, password, method))
  }
}

class AuthForm extends React.Component {
  constructor() {
    super()
    this.state = {
      loginForm: true,
      name: '',
      email: '',
      password: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick() {
    this.setState(previousState => {
      return {loginForm: !previousState.loginForm}
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const name = event.target.name.value || 'blank'
    const email = event.target.email.value
    const password = event.target.password.value
    const method = this.state.loginForm ? 'login' : 'signup'

    console.log('The form type is ----->', this.state.loginForm)
    console.log('The method is (handlsubmit) ------>', method)

    this.props.auth(name, email, password, method)
  }

  render() {
    let disabled

    if (this.state.loginForm) {
      disabled = !this.state.email || !this.state.password
    } else {
      disabled = !this.state.email || !this.state.password || !this.state.name
    }

    return (
      <div id="auth-form">
        <Form onSubmit={this.handleSubmit}>
          {!this.state.loginForm ? (
            <Form.Field>
              <label>Username</label>
              <input
                type="text"
                id="input-name"
                placeholder="Username"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Field>
          ) : (
            <div id="form-space" />
          )}
          <Form.Field>
            <label>Email</label>
            <input
              type="email"
              id="input-email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              id="input-password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          {this.state.loginForm ? (
            <div>
              <Button type="submit" primary disabled={disabled}>
                Login
              </Button>
              <Button type="button" secondary onClick={this.handleClick}>
                Don't have an account? Signup
              </Button>
            </div>
          ) : (
            <div>
              <Button type="submit" primary disabled={disabled}>
                Signup
              </Button>
              <Button type="button" secondary onClick={this.handleClick}>
                Already have an account? Login
              </Button>
            </div>
          )}
        </Form>
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(AuthForm)
