import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Notice from "../Notice"
import 'bootstrap/dist/css/bootstrap.min.css'

class LoginForm extends React.Component {
  render () {
    return (
      <Container>
      <Row>
        <Col sm={{span: 4, offset: 4}}>
          <Card bg="dark" text="white">
          <Card.Header>Login</Card.Header>
            <Notice notice={this.props.notice} variant="warning"/>
          <Card.Body>
            <Form method="POST" action={this.props.submit_url}>
              <Form.Group controlId ="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" />
              </Form.Group>
              <input type="hidden" name="authenticity_token" value={this.props.csrf}></input>
              <Button variant="light" type="submit">Login</Button>
            </Form>
          </Card.Body>
          </Card>
        </Col>
      </Row>

      </Container>
    );
  }
}

export default LoginForm