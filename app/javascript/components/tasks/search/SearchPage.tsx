import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { AppState } from '../../../store/types'
import { startSearch, exitSearch } from '../../../store/actions'
import { handleSearch } from '../../../store/actions/tasks'
import { Task } from '../../../store/types/tasks'

import ToDoList from '../ToDoList'

function getAllTags(tasks: Task[]) {
  var tags_xs: string[] = []
  for (var i = 0; i < tasks.length; i++) {
    for (var j = 0; j < tasks[i].tags.length; j++) {
      if (!tags_xs.includes(tasks[i].tags[j])) {
        tags_xs.push(tasks[i].tags[j])
      }
    }
  }
  return tags_xs;
}

const mapStateToProps = (state: AppState) => {
  return {
    task_xs: state.task_xs
  }
}

const mapDispatchToProps = {
  startSearch,
  exitSearch,
  handleSearch
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>
type State = {
  search_name: string,
  search_tag: string,
}

class SearchPageComp extends Component<Props, State> {
  allTags: string[]

  constructor(props: Props) {
    super(props)
    this.props.startSearch()
    this.allTags = getAllTags(this.props.task_xs);
    this.state = {
      search_name: "",
      search_tag: ""
    }
  }

  componentWillUnmount() {
    this.props.exitSearch()
  }

  render() {
    return (
      <div>
        <input type="text" className="form-control form-text"
          value={this.state.search_name}
          placeholder="Search via task name"
          onChange={(e) => {
            this.props.handleSearch({
              search_name: e.currentTarget.value,
              search_tag: this.state.search_tag
            });
            this.setState({ search_name: e.currentTarget.value});
          }}
        />

        {this.allTags.map(tag_name => {
          return (
            <button type="button" key={tag_name}
              className="btn btn-outline-secondary mr-1"
              onClick={() => {
                this.props.handleSearch({
                  search_name: this.state.search_name,
                  search_tag: tag_name
                });
                this.setState({search_tag: tag_name})
              }}>
              {tag_name}
            </button>
          )})}


        <ToDoList />

      </div>
    )
  }
}

const SearchPage = connector(SearchPageComp)
export default SearchPage
