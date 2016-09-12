import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';

class UserForm extends React.Component {
  render() {
  const { handleSubmit } = this.props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email"/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
}

UserForm = reduxForm({
  form: 'userForm' // a unique name for this form
})(UserForm);

export default UserForm
