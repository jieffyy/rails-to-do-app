import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import LoginForm from "./form/LoginForm"
import SearchBar from "./form/SearchBar"
import TaskForm from "./form/TaskForm"
import TaskIndex from "./form/TaskIndex"

class Main extends React.Component {
  render() {
    return (
      <Container>
        <Row style={{alignItems: "center"}}>
          <Col sm="4"><LoginForm csrf={this.props.csrf} notice={this.props.notice} user={this.props.user}/></Col>
          <Col sm="8"><TaskForm csrf={this.props.csrf} notice={this.props.notice} user={this.props.user}/></Col>
        </Row>
        <Row>
          <Col sm="4"><SearchBar user_id notice/></Col>
          <Col sm="8"><TaskIndex user_id notice/></Col>
        </Row>
      </Container>
    );
  }
}

Main.propTypes = {
  notice: PropTypes.string,
  csrf: PropTypes.string,
  user: PropTypes.object,
  tasks: PropTypes.object
}

export default Main
