import React from "react"
import PropTypes from "prop-types"
import {Container, Row, Col, Card, Form, Button} from "react-bootstrap"
import Notice from "../Notice"

function LoggedIn(props) {
  try {
    // render user profile
    return (
      <Card.Body>
        <Card.Title>Welcome {props.user.username}!</Card.Title>
        <Card.Text><a href="/logout">Logout</a></Card.Text>
      </Card.Body>
    );
  }
  catch (TypeError) {
    // render login page
    return (
      <Card.Body>
        <Notice notice={props.notice} variant="warning"/>
        <Form method="POST" action="/login">
          <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="username" />
          </Form.Group>
          <input type="hidden" name="authenticity_token" value={props.csrf}></input>
          <Button variant="dark" type="submit">Login</Button>
        </Form>
      </Card.Body>
      );
  }
}

class LoginForm extends React.Component {
  render () {
    return (
      <Card bg="light">
      <Card.Header> {this.props.user ? "User Profile" : "Login"} </Card.Header>
      <LoggedIn csrf={this.props.csrf} notice={this.props.notice} user={this.props.user} />
      </Card>
    );
  }
}

LoginForm.propTypes = {
  notice: PropTypes.string,
  csrf: PropTypes.string,
  user: PropTypes.object
}

export default LoginForm