import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logInUser } from '../actions/user'

import LogInForm from '../components/LogInForm'

class LogInFormContainer extends React.Component {

  handleSubmit(values) {
    console.log(values)
    console.log(this.props.logInUser(values))
    // this.props.logInUser(values)
  }

  render() {
    return(
      <LogInForm onSubmit={this.handleSubmit.bind(this)} loggedInUser={this.props.loggedInUser}/>
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
