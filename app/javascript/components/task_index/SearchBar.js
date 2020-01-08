import React from 'react'
import PropTypes from 'prop-types'
import {FormControl, Col, InputGroup, Dropdown, DropdownButton} from 'react-bootstrap'

function TagFilter(props) {
  const render_dropdown = props.tags_xs.length > 0
    ? props.tags_xs.map(tag_name => 
      <Dropdown.Item key={tag_name} name={tag_name} onClick={e => props.handleTagFilter(e.target.name)}>{tag_name}</Dropdown.Item>)
    : <Dropdown.Item>No tags</Dropdown.Item>
  
  return (
    <>
    <Dropdown.Item eventKey="1" onClick={e => props.handleTagFilter("")}>Show All</Dropdown.Item>
    <Dropdown.Divider />
    {render_dropdown}
    </>
  );
}

class SearchBar extends React.Component {
  render() {
    return (
      <Col sm="6" className="pl-0">
        <InputGroup>
          <DropdownButton as={InputGroup.Prepend} variant="outline-secondary"
                          title="Filter by tag">
            {<TagFilter tags_xs={this.props.tags_xs} handleTagFilter={this.props.handleTagFilter} />}
          </DropdownButton>

          <FormControl placeholder="Search for a task or tag"
                    onChange={e => this.props.onChange(e.target.value)} value={this.props.value} />
        </InputGroup>
      </Col>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  handleTagFilter: PropTypes.func.isRequired,
  tags_xs: PropTypes.array.isRequired,
}

export default SearchBar