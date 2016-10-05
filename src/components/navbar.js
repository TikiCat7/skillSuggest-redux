import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logOutUser } from '../actions/user'

import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open:false
    }
  }

  toggleSideBar() {
    this.setState({open: !this.state.open});
  }

  handleMainClick() {
    console.log("menu item1 pressed")
    this.context.router.push('/main')
    this.toggleSideBar()
  }

  handleSignUpClick() {
    console.log("sign up pressed")
    this.context.router.push('/signup')
    this.toggleSideBar()
  }

  handleLogInClick() {
    console.log("login pressed")
    this.context.router.push('/login')
    this.toggleSideBar()
  }

  handleSignOutClick() {
    console.log("signout pressed")
    localStorage.removeItem('token')
    this.props.logOutUser()
    this.context.router.push('/main')
    this.toggleSideBar()
  }

  render(){

    const styles = {
      appBar: {
        textAlign: 'center',
        position: 'fixed'
      }
    }

  const { loggedInStatus } = this.props

    return(

      <div>
        <AppBar
          title="Redux Skill Assign Practice App"
          iconElementRight={<FlatButton label={
            loggedInStatus.loggedIn == false? "Not Logged In": `Logged in as:${loggedInStatus.name}`
          } />}
          onLeftIconButtonTouchTap={this.toggleSideBar.bind(this)}
          style={styles.appBar}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          width={200}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleMainClick.bind(this)}>Browse Users</MenuItem>
          <MenuItem onTouchTap={this.handleSignUpClick.bind(this)}>Sign Up</MenuItem>
          <MenuItem onTouchTap={this.handleLogInClick.bind(this)}>Log In</MenuItem>
          {loggedInStatus.loggedIn == true? <MenuItem onTouchTap={this.handleSignOutClick.bind(this)}>Sign Out</MenuItem>: null}
        </Drawer>
        <div>
          { this.props.children }
        </div>
      </div>
        )
  }
}
Navbar.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
      loggedInStatus: state.skillApp.loggedInUser,
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // call action to update loggedIn state
    logOutUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
