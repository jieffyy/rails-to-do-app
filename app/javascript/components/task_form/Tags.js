import React from 'react'
import {Badge, Row, Col, Form, Button, InputGroup} from 'react-bootstrap'

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
      <Col sm="8">
        <InputGroup>
          <Form.Control type="text" placeholder="New tag" value={props.value} onChange={props.onChange} />
          <InputGroup.Append>
            <Button variant="secondary" onClick={props.onClick}>Tag</Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
      </Row>
    );
  };
}

function TagManager(props) {
  if (props.action !== "new" && props.tags.length > 0) {
    const tags_man = props.tags.map(tag => 
      <InputGroup key={tag}>
        <Form.Control type="text" value={tag} disabled plaintext />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={e => props.delete(tag, true)}>Delete</Button>
        </InputGroup.Append>
      </InputGroup>
    );

    return (
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label as={Row}>Tags Manager</Form.Label>
          <Col sm="4" className="pl-0">{tags_man}</Col>
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


export {Tags, TagArr}