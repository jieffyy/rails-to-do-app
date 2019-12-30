import React from "react"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css'

class Header extends React.Component {
  render () {
    return (
      <Container className="my-2">
        <Navbar variant="dark" bg="dark">
          <Navbar.Brand href="/tasks">ToDoApp</Navbar.Brand>
        </Navbar>
      </Container>
    );
  }
}

export default Header
