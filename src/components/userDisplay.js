import React, { Component, PropTypes } from 'react'

class UserDisplay extends React.Component {

  constructor(props) {
    super()
    this.state = {
      user: ''
    }
    this.handleUserAdd = this.handleUserAdd.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleUserAdd() {
    this.props.onAddUser(this.state.user)
    this.setState({user:''})
  }

  handleOnChange(e) {
    this.setState({
      user:e.target.value
    })
  }

  render() {
    const { users } = this.props
    const usersMapped = users.map(user => {
      return(
        <li key={user}>{user.name}</li>
      )
    })

    return (<div>Current Users:
      <ul>
        {usersMapped}
      </ul>
      <div>Add User</div>
      <div>
        <input type="text" value={this.state.user} onChange={this.handleOnChange} placeholder="add a user"></input>
        <button type='submit' onClick={this.handleUserAdd}>Add User</button>
      </div>
    </div>
  )
  }
}

export default UserDisplay
