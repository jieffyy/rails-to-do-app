import React from "react"
import PropTypes from 'prop-types'
import Alert from "react-bootstrap/Alert"
import 'bootstrap/dist/css/bootstrap.min.css'

class Notice extends React.Component {
  hasNotice (present) {
    if (present) {
      return <Alert variant={this.props.variant}>{this.props.notice}</Alert>;
    } else {
      return null;
    }
  }

  render () {
    return (
      this.hasNotice(this.props.notice)
    );
  }
}

Notice.propTypes = {
  notice: PropTypes.string,
  variant: PropTypes.string
}

export default Notice