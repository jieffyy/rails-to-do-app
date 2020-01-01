import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import LoginForm from "./form/LoginForm"
import TaskForm from "./form/TaskForm"
import TaskIndex from "./form/TaskIndex"

class Main extends React.Component {
  render() {
    return (
      <Container>
        <Row style={{alignItems: "center"}} className="my-3">
          <Col sm="4"><LoginForm csrf={this.props.csrf} notice={this.props.notice} user={this.props.user}/></Col>
          <Col sm="8"><TaskForm csrf={this.props.csrf} notice={this.props.notice} user={this.props.user}/></Col>
        </Row>
        <Row className="my-3">
          <Col><TaskIndex tasks={this.props.tasks}/></Col>
        </Row>
      </Container>
    );
  }
}

Main.propTypes = {
  notice: PropTypes.string,
  csrf: PropTypes.string,
  user: PropTypes.object,
  tasks: PropTypes.array
}

export default Main
