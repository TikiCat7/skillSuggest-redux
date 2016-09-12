import React, { Component, PropTypes } from 'react'

class TodoInputBox extends Component {

  constructor() {
    super()
    this.state = {
      todo: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleTodoAdd = this.handleTodoAdd.bind(this)
  }

  handleOnChange(e) {
    this.setState({
      todo:e.target.value
    })
  }

  handleTodoAdd() {
    this.props.onTodoAdd(this.state.todo)
    this.setState({todo:''})
  }

  render() {
    return(
      <div>
        <input type="text" value={this.state.todo} onChange={this.handleOnChange} placeholder="put a todo"></input>
        <button type='submit' onClick={this.handleTodoAdd}>Add Todo</button>
      </div>
    )
  }
}

TodoInputBox.propTypes = {
  onTodoAdd: PropTypes.func.isRequired
}

export default TodoInputBox
