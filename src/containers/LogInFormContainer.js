import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LogInForm from '../components/logInForm'
import { logInUser } from '../actions/user'

class LogInFormContainer extends React.Component {

  handleSubmit(values) {
    console.log(values)
    this.props.logInUser(values)
  }

  render() {
    const styles = {
      form: {
        textAlign: 'center',
        paddingTop: 80
        }
    }
    return(
      <LogInForm onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      loggedInUser: state.skillApp.loggedInUser
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logInUser
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LogInFormContainer)
