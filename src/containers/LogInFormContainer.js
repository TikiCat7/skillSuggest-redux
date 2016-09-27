import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logInUser } from '../actions/user'

import LogInForm from '../components/LogInForm'

class LogInFormContainer extends React.Component {

  handleSubmit(values) {
    // after user sign up is finished, reroute to that route
    this.props.logInUser(values).then((id) => {
      this.context.router.push(`/user/${id}`)
    })
  }

  render() {
    return(
      <LogInForm onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

LogInFormContainer.contextTypes = {
  router: PropTypes.object.isRequired
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
