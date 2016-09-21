import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//import actions, components
import { getCurrentUser } from '../actions/user'
import { clearCurrentUser } from '../actions/user'
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

  handleClick(id) {
    console.log(id)
    console.log(this.context)
    this.context.router.push(`/user/${id}`)
  }

  render() {
    return(
      <CurrentUserDetail handleClick={this.handleClick.bind(this)} currentUserData={this.props.currentUser} />
    )
  }
}

CurrentUserDataContainer.contextTypes = {
  router: PropTypes.object.isRequired,
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
