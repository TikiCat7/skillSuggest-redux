import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';
// import TextField from 'material-ui/TextField';  //https://github.com/erikras/redux-form/issues/1249
import { TextField } from 'redux-form-material-ui'; // wrapper because errors
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name', 'age', 'job', 'password', 'passwordConfirmation' ]
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

class LogInForm extends React.Component {
  render() {
  const { handleSubmit } = this.props;
  const styles = {
      textAlign: 'center',
      paddingTop: 80
  }

  return (
    <div style={styles}>
      <h1>Sign Up!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="name"
            component={TextField}
            floatingLabelText="Your name"/>
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

        <RaisedButton label="Submit" type="submit"/>
      </form>
    </div>
  );
}
}

LogInForm = reduxForm({
  form: 'userForm',
  validate // a unique name for this form
})(LogInForm);

export default LogInForm
