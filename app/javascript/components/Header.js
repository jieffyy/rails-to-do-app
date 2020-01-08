import React from "react"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css'

class Header extends React.Component {
  render () {
    return (
      <Container className="my-2 pl-0">
        <Navbar variant="dark" bg="dark">
          <Navbar.Brand>ToDoApp</Navbar.Brand>
        </Navbar>
      </Container>
    );
  }
}

export default Header
