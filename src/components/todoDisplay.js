import React, { Component, PropTypes } from 'react'

class TodoDisplay extends React.Component {
    render() {
      const { todos } = this.props
      const todosMapped = todos.map(todo => {
        return(
          <li key={todo}>{todo}</li>
        )
      })

      return (<div>Current Todos:
        <ul>
          {todosMapped}
        </ul>
      </div>
    )
    }
}

TodoDisplay.propTypes = {
  todos: PropTypes.array.isRequired
}

export default TodoDisplay
