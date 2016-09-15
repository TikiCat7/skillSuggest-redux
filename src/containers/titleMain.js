import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import addTodoAction from '../actions/title'
import addUser from '../actions/user'

import TodoInputBox from '../components/todoInputBox'
import TodoDisplay from '../components/todoDisplay'
import UserDisplay from '../components/userDisplay'

class TitleMain extends Component {
  onAddTodo(value) {
    this.props.addTodoAction(value)
  }

  onAddUser(user) {
    const userObj = {
      name: user
    }
    this.props.addUser(userObj, this.props.userList)
  }

  render() {
    const { todos, userList } = this.props

    return (
      <div>
        <TodoInputBox onTodoAdd={this.onAddTodo.bind(this)}/>
        <TodoDisplay todos={todos} />
        <UserDisplay users={userList} onAddUser={this.onAddUser.bind(this)}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.skillApp.todos,
    userList: state.skillApp.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTodoAction,
    addUser
  }, dispatch)
  }

export default connect(mapStateToProps,mapDispatchToProps)(TitleMain)
