import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LogInForm from '../components/logInForm'

import { logInUser, logInFail } from '../actions/user'

class LogInFormContainer extends React.Component {

  handleSubmit(values) {
    console.log(values)
    this.props.logInUser(values).then((user)=>{
      if(user.id && user.token){
        localStorage.setItem('token', user.token)
        this.context.router.push(`user/${user.id}`)
      } else {
        console.log('log in failed')
      }
    })
  }

  render() {
    const styles = {
      form: {
        textAlign: 'center',
        paddingTop: 80
        }
    }
    return(
      <LogInForm onSubmit={this.handleSubmit.bind(this)} displayLogInError = {this.props.notification} />
    )
  }
}

LogInFormContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
      loggedInUser: state.skillApp.loggedInUser,
      notification: state.skillApp.notification.logInError
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logInUser
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LogInFormContainer)
