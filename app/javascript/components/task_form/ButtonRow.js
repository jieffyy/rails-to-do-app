import React from 'react'
import PropTypes from 'prop-types'
import {Button, Row, Col} from 'react-bootstrap'

function CmdButton(props) {
  if (props.flag === "new") {
    return (
      <>
      <Button className="mr-1" variant="dark" onClick={props.submit}>New Task</Button>
      <Button className="mr-1" variant="secondary" onClick={props.reset}>Reset</Button>
      </>
    );
  } else if (props.flag === "edit") {
    return (
      <>
      <Button className="mr-1" variant="dark" onClick={props.edit}>Update Task</Button>
      <Button className="mr-1" variant="secondary" onClick={props.delete}>Delete</Button>
      <Button className="mr-1" variant="secondary" onClick={e => window.location.href = "/"}>Back</Button>
      </>
    );
  } else if (props.flag === "show") {
    return (
    <>
      <Button className="mr-1" variant="secondary" onClick={props.delete}>Delete</Button>
      <Button className="mr-1" variant="secondary" onClick={e => window.location.href = "/"}>Back</Button>
    </>
    );
  }
}

class ButtonRow extends React.Component {
  render () {
    return (
      <Row>
      <Col>
      <CmdButton flag={this.props.flag} 
                 submit={this.props.submit}
                 reset={this.props.reset}
                 edit={this.props.edit}
                 delete={this.props.delete}  />
      </Col>
      </Row>
    );
  }
}

ButtonRow.propTypes = {
  flag: PropTypes.string
}

export default ButtonRow