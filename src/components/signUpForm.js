import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
// import TextField from 'material-ui/TextField';  //https://github.com/erikras/redux-form/issues/1249
import { TextField } from 'redux-form-material-ui' // wrapper because errors
import RaisedButton from 'material-ui/RaisedButton'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name', 'age', 'job', 'password', 'passwordConfirmation' ]
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required'
    }

    if(values['password']!==null && values['passwordConfirmation']!==null && values['password']!==values['passwordConfirmation']) {
      //errors['password'] = "Password doesn't match"
      errors['passwordConfirmation'] = "Password doesn't match"
    }
  })
  return errors
}

class SignUpForm extends React.Component {

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

  return (
    <div style={styles.form}>
      <h1>Sign Up!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="name"
            component={TextField}
            floatingLabelText="Your name"
          />
        </div>
        <div>
          <Field name="age"
            component={TextField}
            floatingLabelText="Your age"/>
        </div>
        <div>
          <Field name="job"
            component={TextField}
            floatingLabelText="Your job"/>
        </div>
        <div>
          <Field name="password"
            component={TextField}
            floatingLabelText="Enter password"
            type="password"/>
        </div>
        <div>
          <Field name="passwordConfirmation"
            component={TextField}
            floatingLabelText="Enter password again"
            type="password"/>
        </div>
        <div style={styles.submitButton}>
          <RaisedButton label="Submit" disabled={ pristine || submitting } type="submit"/>
        </div>
      </form>
    </div>
  );
}
}

SignUpForm = reduxForm({
  form: 'signUpForm',
  validate // a unique name for this form
})(SignUpForm);

export default SignUpForm
