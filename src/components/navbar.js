import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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
    this.context.router.push('/form')
    this.toggleSideBar()
  }

  render(){

    const styles = {
      appBar: {
        textAlign: 'center',
        position: 'fixed'
      }
    }

  const { loggedInUser } = this.props
  //console.log("logged in as" + loggedInUser)

    return(

      <div>
        <AppBar
          title="Redux Skill Assign Practice App"
          iconElementRight={<FlatButton label={
            loggedInUser.status == false? "Not Logged In": `Logged in as: ${loggedInUser.name}`
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
      loggedInUser: state.skillApp.loggedInUser
    }
}

export default connect(mapStateToProps)(Navbar)
