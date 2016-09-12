import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import addTodoAction from '../actions/title'

import TodoInputBox from '../components/todoInputBox'
import TodoDisplay from '../components/todoDisplay'

class TitleMain extends Component {
  onAddTodo(value) {
    this.props.addTodoAction(value)
  }

  render() {
    const { todos } = this.props

    return (
      <div>
        <TodoInputBox onTodoAdd={this.onAddTodo.bind(this)}/>
        <TodoDisplay todos={todos} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.skillApp.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTodoAction
  }, dispatch)
  }

export default connect(mapStateToProps,mapDispatchToProps)(TitleMain)
