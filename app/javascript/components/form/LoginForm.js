import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Notice from "../Notice"
import 'bootstrap/dist/css/bootstrap.min.css'

class LoginForm extends React.Component {
  render () {
    return (
      <>
      <Card bg="primary" text="white">
        <Card.Header>Login</Card.Header>
        <Notice notice={this.props.notice} variant="warning"/>
        <Card.Body>
          <Form method="POST" action={this.props.submit_url}>
          <Form.Group controlId ="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name="username" />
          </Form.Group>
          <input type="hidden" name="authenticity_token" value={this.props.csrf}></input>
          <Button bg="Light" type="submit">Login</Button>
          </Form>
        </Card.Body>
      </Card>
      </>
    );
  }
}

export default LoginForm