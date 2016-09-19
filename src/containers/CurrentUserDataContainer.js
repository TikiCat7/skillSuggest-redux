import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//import actions, components
import { getCurrentUser } from '../actions/user'
import { clearCurrentUser } from '../actions/user'
import CurrentUserDetail from '../components/CurrentUserDetail'

class CurrentUserDataContainer extends React.Component {

  // when component mounts, dispatch getCurrentUser action
  componentDidMount() {
    console.log("currentUserContainer Mounted")
    this.init()
  }

  componentWillUnmount() {
    console.log("CurrentUserDataContainer Unmounting")
    this.props.clearCurrentUser()
  }

  init() {
    this.props.getCurrentUser(this.props.params.id)
  }

  render() {
    return(
      <CurrentUserDetail currentUserData={this.props.currentUser} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.skillApp.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUser,
    clearCurrentUser
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentUserDataContainer)
