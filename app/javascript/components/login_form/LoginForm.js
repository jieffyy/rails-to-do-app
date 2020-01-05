import React from "react"
import PropTypes from "prop-types"
import {Form, Button} from "react-bootstrap"


function LoggedIn(props) {
  if (props.user) {
    if (props.user.is_guest) {
      return (
        <LoggedIn csrf={props.csrf} />
      );
    } else {
      return (
        <a href="/logout">Logout</a>
      );
    }
  } else {
    return (
    <Form method="POST" action="/login">
      <Form.Group>
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" placeholder="Enter username" name="username" />
      </Form.Group>
      <input type="hidden" name="authenticity_token" value={props.csrf}></input>
      <Button variant="dark" type="submit">Login</Button>
    </Form>
    );
  }
}

class LoginForm extends React.Component {
  render () {
    return (
      <>
      <h1>{this.props.user 
            ? this.props.user.is_guest 
              ? "Login"
              : "@" + this.props.user.username 
            : "Login"}</h1>
      <LoggedIn csrf={this.props.csrf} user={this.props.user} />
      </>
    );
  }
}

LoginForm.propTypes = {
  csrf: PropTypes.string,
  user: PropTypes.object
}


export default LoginForm