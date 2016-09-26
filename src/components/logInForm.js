import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';

class LogInForm extends React.Component {
  render() {
  const { handleSubmit, loggedInUser } = this.props;
  return (
    <div>
      <p>Currently Logged in As:{this.props.loggedInUser.name}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <Field name="age" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="job">Job</label>
          <Field name="job" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password"/>
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <Field name="passwordConfirmation" component="input" type="password"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
}

LogInForm = reduxForm({
  form: 'userForm' // a unique name for this form
})(LogInForm);

export default LogInForm
