import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

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
  constructor(props) {
    super(props)
    this.state = {
      open:true
    }
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleLogIn() {
    this.setState({open: false})
    this.props.handleLogIn()
  }

  handleClose() {
    this.props.handleCancel()
  }

  render(){
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="Login"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleLogIn}
        />,
      ];
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
            <RaisedButton label="Add Skill" disabled={ pristine || submitting } type="submit"/>
          </div>
        </form>
        {this.props.showAuthError && <div>
          <Dialog
            title="Oops! something went wrong"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Please Log in to add a skill
          </Dialog>
        </div>}

      </div>
    )
  }
}

SkillPostBox = reduxForm({
  form: 'skillAddForm',
  validate
})(SkillPostBox);

export default SkillPostBox
