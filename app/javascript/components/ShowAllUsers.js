import React from "react";
import {Container, Row, Col, Button, ButtonGroup} from "react-bootstrap";

class ShowAllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.setAdmin = this.setAdmin.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      users: this.props.users
    };
  }

  delete(e) {
    const cfm = confirm("Are you sure?\nDeleting a user deletes all of their tasks!");
    if (cfm) {
      const curr_user_id = parseInt(e.target.name);
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", "users/" + e.target.name);
      xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
      xhr.send();
      xhr.onreadystatechange = (() => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const new_xs = this.state.users.filter(user => user.id !== curr_user_id);
          this.setState({users: new_xs});
        }
      });
    }
  }

  setAdmin(e) {
    const curr_user_id = parseInt(e.target.name);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "users/set_admin/" + e.target.name);
    xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
    xhr.send();
    xhr.onreadystatechange = (() => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const new_xs = this.state.users.map(user => {
          if (user.id === curr_user_id) {
            var new_user = Object.assign({}, user);
            new_user.is_admin = !user.is_admin;
            return new_user;
          } else {
            return user;
          }
        })
        this.setState({users:new_xs});
      }
    });
  }

  logout(e) {
    window.location.href = "/logout"
  }

  render() {
    if (this.state.users.length > 0) {
      return (
        <Container>
          <h3>Users</h3>

          <Row className="my-3 font-weight-bold">
            <Col sm="6">Username</Col>
            <Col sm="2">Admin Rights</Col>
          </Row>

          {this.state.users.map((user =>
              <Row key={user.id} className="my-3">
                <Col sm="6" className="pt-2 border-top border-secondary">
                  {user.username}
                  <div>
                  <ButtonGroup>
                  <Button variant="outline-secondary" onClick={this.setAdmin} name={user.id}>Change Admin Status</Button>
                  <Button variant="outline-secondary" onClick={this.delete} name={user.id}>Delete</Button>
                  </ButtonGroup>
                  </div>
                </Col>
                <Col sm="2" className="d-flex align-items-center pt-2 border-top border-secondary">{user.is_admin ? "Yes" : "No"}</Col>
              </Row>))}

          <Button className="mr-1" variant="dark" onClick={e => window.location.href = "/"}>Back</Button>
          <Button className="mr-1" variant="outline-secondary" onClick={this.logout}>Logout</Button>
        </Container>
      );
    } else {
      return (
        <Container>
          <div className="my-3">There aren't any users, besides you.</div>

          <Button className="mr-1" variant="dark" onClick={e => window.location.href = "/"}>Back</Button>
          <Button className="mr-1" variant="outline-secondary" onClick={this.logout}>Logout</Button>
        </Container>
      );
    }
  }
}

export default ShowAllUsers;