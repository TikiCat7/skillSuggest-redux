import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signUpUser } from '../actions/user'

import SignUpForm from '../components/signUpForm'


class SignUpFormContainer extends React.Component {

  handleSubmit(values) {
    // after user sign up is finished, reroute to that route
    this.props.signUpUser(values).then((id) => {
      this.context.router.push(`/user/${id}`)
    })
  }

  render() {
    return(
      <SignUpForm onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

SignUpFormContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
      loggedInUser: state.skillApp.loggedInUser
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signUpUser
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpFormContainer)
