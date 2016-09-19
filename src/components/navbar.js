import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';

class Navbar extends Component {
  render(){
    return(
      <div>
        <AppBar
          title="Redux Skill Assign Practice App"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div>
          { this.props.children }
        </div>
      </div>
        )
  }
}

export default Navbar
