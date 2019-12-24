import React from 'react'
import {connect} from 'react-redux'
import {auth, removeUser} from '../store'
import {Button, Form} from 'semantic-ui-react'

const stateProps = state => {
  return {
    user: state.user
  }
}

const dispatchProps = dispatch => {
  return {
    auth: (name, email, password, method) =>
      dispatch(auth(name, email, password, method)),
    removeUser: () => dispatch(removeUser())
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

  componentDidMount() {
    this.props.removeUser()
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

    this.props.auth(name, email, password, method)
  }

  render() {
    let errorMessage

    if (this.props.user && this.props.user.error) {
      errorMessage = (
        <p id="form-error">Error: {this.props.user.error.response.data}</p>
      )
    } else {
      errorMessage = null
    }

    return (
      <div id="auth-form">
        {this.state.loginForm ? (
          <Form onSubmit={this.handleSubmit}>
            {errorMessage}
            <Form.Field>
              <label style={{marginTop: '25px'}}>Email</label>
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
            <div id="google-auth">
              <a href="/auth/google">Login with Google</a>
            </div>
            <div>
              <Button
                type="submit"
                primary
                disabled={!this.state.email || !this.state.password}
              >
                Login
              </Button>
              <Button type="button" secondary onClick={this.handleClick}>
                Don't have an account? Signup
              </Button>
            </div>
          </Form>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            {errorMessage}
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
            <div id="google-auth">
              <a href="/auth/google">Signup with Google</a>
            </div>
            <div>
              <Button
                type="submit"
                primary
                disabled={
                  !this.state.email || !this.state.password || !this.state.name
                }
              >
                Signup
              </Button>
              <Button type="button" secondary onClick={this.handleClick}>
                Already have an account? Login
              </Button>
            </div>
          </Form>
        )}
      </div>
    )
  }
}

export default connect(stateProps, dispatchProps)(AuthForm)
