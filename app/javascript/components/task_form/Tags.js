import React, {useState} from 'react'
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

function TagManager(props) {
  if (props.action !== "new" && props.tags.length > 0) {
    const tags_man = props.action === "edit"
      ? props.tags.map(tag => (
        <Row key={tag}>
          <Col sm="1" >{tag}</Col>
          {/* <Col sm="1"><a href="" onClick={e => props.edit(tag)}>Edit</a></Col> */}
          <Col sm="1"><a href="" onClick={e => props.delete(tag, true)}>Delete</a></Col>
        </Row>
        ))
      : props.tags.map(tag => (
        <Row key={tag}>
          <Col sm="1">{tag}</Col>
          <Col sm="1"><a href="" onClick={e => props.delete(tag)}>Delete</a></Col>
        </Row>
      ));

    return (
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label as={Row}>Tags Manager</Form.Label>
          {tags_man}
        </Form.Group>
      </Form.Row>
    );
  } else {
    return null;
  }
}

class Tags extends React.Component {
  render () {
    return (
      <>
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
      <TagManager action={this.props.action} tags={this.props.tags} edit={this.props.editTag} delete={this.props.deleteTag}/>
      </>
    );
  }
}


export default Tags