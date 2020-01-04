import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col} from "react-bootstrap"
import Notice from "./Notice"
import LoginForm from "./login_form/LoginForm"
import TaskForm from "./task_form/TaskForm"

class Main extends React.Component {
  render() {
    return (
      <Container>
        <Row style={{alignItems: "center"}} className="my-3">
          <Col sm="4">
            <Notice notice={this.props.notice} variant="warning"/>
            <LoginForm csrf={this.props.csrf} user={this.props.user}/>
          </Col>
          <Col sm="8">
            <TaskForm csrf={this.props.csrf} action="new"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

Main.propTypes = {
  notice: PropTypes.string,
  csrf: PropTypes.string,
  user: PropTypes.object,
}

export default Main