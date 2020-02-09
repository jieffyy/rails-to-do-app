import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { AppState } from '../../store/types';
import { registerUser } from '../../store/actions/users';

const mapStateToProps = (state: AppState) => {
  return {
    csrf: state.csrf
  }
}

const mapDispatchToProps = {
  registerUser,
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

class RegisterComp extends Component<PropsFromRedux, AppState> {
  render() {
    const RegisterSchema = Yup.object().shape({
      username: Yup.string().required("Username cannot be empty"),
      password: Yup.string().required("Password cannot be empty"),
      cfm_password: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Password doesn't match")
    })

    return (
      <>

        <h3>Register</h3>
        <Formik
          initialValues={{ username: "", password: "", cfm_password: "", authenticity_token: this.props.csrf }}
          onSubmit={values => this.props.registerUser(values)}
          validationSchema={RegisterSchema}
        >

          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <ErrorMessage name="username">
                  {msg => <div className="alert alert-warning">{msg}</div>}
                </ErrorMessage>
                <ErrorMessage name="password">
                  {msg => <div className="alert alert-warning">{msg}</div>}
                </ErrorMessage>
                <ErrorMessage name="cfm_password">
                  {msg => <div className="alert alert-warning">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label>Username:</label>
                <input type="text" className="form-control" name="username"
                  placeholder="Enter desired username"
                  onChange={formik.handleChange} />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control" name="password"
                  placeholder="Enter desired password"
                  onChange={formik.handleChange} />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control" name="cfm_password"
                  placeholder="Confirm the password"
                  onChange={formik.handleChange} />
              </div>

              <button type="submit" className="btn btn-dark">Register</button>

            </form>
          )}

        </Formik>
      </>
    )
  }
}

const Register = connector(RegisterComp);
export default Register;