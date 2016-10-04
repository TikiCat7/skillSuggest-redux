import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

const validate = (values) => {
  const errors = {}
  const requiredFields = [ 'skill' ]
  requiredFields.forEach(field => {
    if(!values.skill) {
      errors[field] = 'Required'
    }
    if (values.skill && values.skill.length > 50) {
      errors[field] = 'Must be 50 characters or less'
    }
  })
  return errors
}

class SkillPostBox extends React.Component {
  render(){
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
    return(
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="skill"
              component={TextField}
              floatingLabelText="enter Skill to add"
            />
          </div>

          <div style={styles.submitButton}>
            <RaisedButton label="Submit" disabled={ pristine || submitting } type="submit"/>
          </div>
        </form>
      </div>
    )
  }
}

SkillPostBox = reduxForm({
  form: 'skillAddForm',
  validate
})(SkillPostBox);

export default SkillPostBox
