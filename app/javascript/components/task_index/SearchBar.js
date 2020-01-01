import React from 'react'
import {Col, FormControl, Button} from 'react-bootstrap'

class SearchBar extends React.Component {
  render() {
    return (
      <>
      <Col sm="4" className="p-0"><FormControl placeholder="Search for a task or tag" onChange={this.props.find}/></Col>
      </>
    );
  }
}

export default SearchBar