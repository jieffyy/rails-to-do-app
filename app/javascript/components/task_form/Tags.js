import React from 'react'
import {Badge, Row, Col, Form, Button} from 'react-bootstrap'

function TagArr(props) {
  if (props.tag_arr.length > 0) {
    return props.tag_arr.map( (name, index) =>
      <Badge className="mr-1" variant="info" key={index}>{name}</Badge>
    );
  } else {
    return (<div>There aren't any tags!</div>);
  }
}

function TagForm(props) {
  if (props.readOnly) {
    return null;
  } else {
    return (
      <Row>
        <Col sm="6" className="pr-0">
          <Form.Control type="text" placeholder="New tag" value={props.value} onChange={props.onChange} />
        </Col>
        <Col sm="6"className="pl-0">
          <Button variant="secondary" onClick={props.onClick}>Tag</Button>
        </Col>
      </Row>
    );
  };
}

class Tags extends React.Component {
  render () {
    return (
      <Form.Row>
      <Form.Group as={Col}>
        <Form.Label as={Row}>Tags</Form.Label>
        <Row className="mb-1">
          <Col><TagArr tag_arr={this.props.tags} /></Col>
        </Row>
      <TagForm onChange={this.props.onChange} onClick={this.props.onClick}
               value={this.props.input_val} readOnly={this.props.readOnly} />
      </Form.Group>
      </Form.Row>
    );
  }
}


export default Tags