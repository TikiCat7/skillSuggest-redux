import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//import actions, components
import { getCurrentUser, clearCurrentUser, disableLogInMessage, postNewSkill, logInFail, handleCancel, handleDuplicateErrorCancel, disableSkillAddSnackBar } from '../actions/user'
import CurrentUserDetail from '../components/CurrentUserDetail'

class CurrentUserDataContainer extends React.Component {
  // when component mounts, dispatch getCurrentUser action
  componentDidMount() {
    // console.log("currentUserContainer Mounted")
    this.init()
  }

  init() {
    this.props.getCurrentUser(this.props.params.id)
  }

  componentWillUnmount() {
    // console.log("CurrentUserDataContainer Unmounting")
    this.props.clearCurrentUser()
  }

  handleLogInMessage() {
    console.log("disable the login message")
    this.props.disableLogInMessage()
  }

  handleSnackBarClose() {
    console.log("disable snackbar for skill add")
    this.props.disableSkillAddSnackBar()
  }

  handleLogIn() {
    this.context.router.push('/login')
  }

  handleCancel() {
    this.props.handleCancel()
  }

  handleDuplicateErrorCancel() {
    this.props.handleDuplicateErrorCancel()
  }

  // Fix for nested route issue, seems like a bad idea though
  componentWillReceiveProps(nextProps){
    if(nextProps.params.id !== this.props.params.id) {
      console.log('Dispatching getCurrentUser manually as work around')
      const {dispatch, params} = nextProps;
        this.props.getCurrentUser(params.id)
    }
  }

  handleSubmit(values) {
    console.log("things we have access to")
    console.log(values)
    console.log(this.props.currentUser)

    const postParams = {
      name: values.skill,
      assignee_id: this.props.loggedInUser.id,
      assignee_name: this.props.loggedInUser.name,
      user_id: this.props.currentUser.id
    }
    console.log(postParams)
    this.props.postNewSkill(postParams).then((response) => {
      if(response.redirectToLogIn != null) {
        console.log("in login fail")
        localStorage.removeItem('token')
        this.props.logInFail()
      }
  })
}

  render() {
    return(
      <CurrentUserDetail currentUserData={this.props.currentUser}
        logInInfo={this.props.loggedInUser}
        handleLogInMessage={this.handleLogInMessage.bind(this)}
        handleSnackBarClose={this.handleSnackBarClose.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
        showAuthError={this.props.notification.logInError}
        showDuplicateSkillError={this.props.notification.duplicateError}
        handleLogIn={this.handleLogIn.bind(this)}
        handleCancel={this.handleCancel.bind(this)}
        handleDuplicateErrorCancel = {this.handleDuplicateErrorCancel.bind(this)}
        isFetching={this.props.isFetching}
        showSnackBar={this.props.showSnackBar}
      />
    )
  }
}

CurrentUserDataContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.skillApp.currentUser,
    loggedInUser: state.skillApp.loggedInUser,
    notification: state.skillApp.notification,
    isFetching: state.skillApp.isFetching,
    showSnackBar: state.skillApp.notification.showSkilLSnackBar
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUser,
    clearCurrentUser,
    disableLogInMessage,
    postNewSkill,
    logInFail,
    handleCancel,
    handleDuplicateErrorCancel,
    disableSkillAddSnackBar
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentUserDataContainer)
