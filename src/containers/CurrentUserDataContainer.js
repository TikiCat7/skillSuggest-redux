import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//import actions, components
import { getCurrentUser, clearCurrentUser, disableLogInMessage, postNewSkill } from '../actions/user'
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

  // Fix for nested route issue, seems like a bad idea though
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
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
    this.props.postNewSkill(postParams)
  }

  render() {
    return(
      <CurrentUserDetail currentUserData={this.props.currentUser}
        logInInfo={this.props.loggedInUser}
        handleLogInMessage={this.handleLogInMessage.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
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
    loggedInUser: state.skillApp.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUser,
    clearCurrentUser,
    disableLogInMessage,
    postNewSkill
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentUserDataContainer)
