import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { AppState } from '../../../store/types'
import { handleSearch } from '../../../store/actions/tasks'
import ToDoList from '../ToDoList'

const mapStateToProps = (state: AppState) => {
  return {
    task_xs: state.task_xs
  }
}

const mapDispatchToProps = {
  handleSearch
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>

class SearchPageComp extends Component<Props, {search_term: string}> {
  constructor(props: Props) {
    super(props),
    this.state = {
      search_term: ""
    }
  }

  render() {
    return (
      <div>
        <input type="text" className="form-control form-text"
          value={this.state.search_term}
          placeholder="Search via task name"
          onChange={(e) => {
            this.setState({search_term: e.currentTarget.value});
            this.props.handleSearch(e.currentTarget.value);
          }}
        />

        <ToDoList />

      </div>
    )
  }
}

const SearchPage = connector(SearchPageComp)
export default SearchPage
