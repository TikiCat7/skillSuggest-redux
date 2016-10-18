import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name', 'password' ]
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

class LogInForm extends React.Component {

  goSignUp() {
    this.context.router.push('/signup')
  }

  render() {
  const { handleSubmit, pristine, submitting } = this.props;
  const styles = {
    form: {
      textAlign: 'center',
      paddingTop: 80
      },
    submitButton: {
      paddingTop: 30
    }
  }

  const { displayLogInError } = this.props
  return (
    <div style={styles.form}>
      <h1>Log In</h1>
      {displayLogInError && <h1>LOG IN ERROR</h1>}
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="name"
            component={TextField}
            floatingLabelText="Your name"
          />
        </div>

        <div>
          <Field name="password"
            component={TextField}
            floatingLabelText="Enter password"
            type="password"/>
        </div>

        <div style={styles.submitButton}>
          <RaisedButton label="Submit" disabled={ pristine || submitting } type="submit"/>
        </div>
        <div style={styles.submitButton}>
          <h3>Not a member?</h3>
          <RaisedButton label='Sign up' onClick={this.goSignUp.bind(this)}/>
        </div>
      </form>
    </div>
  );
}
}

LogInForm.contextTypes = {
  router: PropTypes.object.isRequired
}

LogInForm = reduxForm({
  form: 'logInForm',
  validate
})(LogInForm);

export default LogInForm
