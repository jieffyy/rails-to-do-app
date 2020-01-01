import React from "react"
import PropTypes from "prop-types"
import {Form, Button} from "react-bootstrap"
import Notice from "../Notice"

function LoggedIn(props) {
  if (props.user) {
    return (
      <a href="/logout">Logout</a>
    );
  } else {
    return (
    <>
    <Form method="POST" action="/login">
      <Form.Group>
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" placeholder="Enter username" name="username" />
      </Form.Group>
      <input type="hidden" name="authenticity_token" value={props.csrf}></input>
      <Button variant="dark" type="submit">Login</Button>
    </Form>
    </>
    );
  }
}

class LoginForm extends React.Component {
  render () {
    return (
      <>
      <Notice notice={this.props.notice} variant="warning"/>
      <h1>{this.props.user ? "@" + this.props.user.username : "Login"}</h1>
      <LoggedIn csrf={this.props.csrf} user={this.props.user} />
      </>
    );
  }
}

LoginForm.propTypes = {
  notice: PropTypes.string,
  csrf: PropTypes.string,
  user: PropTypes.object
}


export default LoginForm