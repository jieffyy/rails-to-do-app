import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import BaseForm from './BaseForm'
import { fetchAPI } from '../../store/actions'
import { setTask } from '../../store/actions/tasks'

const mapDispatchToProps = {
  setTask,
  fetchAPI
}

const connector = connect(null, mapDispatchToProps);
type Props = ConnectedProps<typeof connector> & RouteComponentProps<{id?: string}>

class TaskFormComp extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    if (this.props.match.params.id) {
      this.props.setTask(parseInt(this.props.match.params.id))
    }
  }

  render() {
    return <BaseForm />
  }
}

const TaskForm = connector(TaskFormComp)
export default TaskForm