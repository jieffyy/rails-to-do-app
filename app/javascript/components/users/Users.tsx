import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Accordion, Card, Button } from 'react-bootstrap';

import { AppState } from '../../store/types';

import Login from './Login';
import Register from './Register';

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user,
    notice: state.notice
  }
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class UsersComp extends Component<PropsFromRedux, AppState> {
  render() {
    const notice = <div className="alert alert-warning">{this.props.notice}</div>
    if (this.props.user) {
      return (
        <>
          {this.props.notice !== "" ? notice : null}
          <h3 className="overflow-hidden">@{this.props.user.username}</h3>
          <a href="/logout">Logout</a>
        </>
      );
    } else {
      return (
        <>
          {this.props.notice !== "" ? notice : null}
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Login
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body><Login /></Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Register
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body><Register /></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </>
      );
    }
  }
}

const Users = connector(UsersComp);
export default Users;
