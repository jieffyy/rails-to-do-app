import React from "react"
import PropTypes from "prop-types"
import {Form, Button, Row, Col} from "react-bootstrap"


function LoggedIn(props) {
  if (props.user) {
    if (props.user.is_guest) {
      return (
        <LoggedIn csrf={props.csrf} />
      );
    } else if (props.user.is_admin) {
      return (
        <>
        <a href="/users">Manage Users</a> | <a href="/logout">Logout</a>
        </>
      );
    } else {
      return (
        <a href="/logout">Logout</a>
      );
    }
  } else {
    return (
    <Form method="POST" action="/login">
      <Form.Group as={Row}>
        <Form.Label column sm="4">Username:</Form.Label>
        <Col><Form.Control type="text" placeholder="Enter username" name="username" /></Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">Password:</Form.Label>
        <Col><Form.Control type="password" placeholder="Password" name="password" /></Col>
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
      <h3 style={{whiteSpace:"nowrap", overflowX:"hidden", overflowY: "visible", textOverflow:"ellipsis", height:"2.25rem"}}>
          {this.props.user 
            ? this.props.user.is_guest 
              ? "Login"
              : "@" + this.props.user.username 
            : "Login"}</h3>
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