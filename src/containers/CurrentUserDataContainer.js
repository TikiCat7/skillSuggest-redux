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
    // this.context.router.push(`/user/${id}`)
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
