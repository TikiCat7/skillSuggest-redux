import { combineReducers } from 'redux'
import { List } from 'immutable'

// import immutable records
//import Issue from '../lib/records/Issue'

// import actions for the reducers
//import IssueActions from '../actions/issue'
function addTodo(todo) {
  return {
    type: 'ADD_TODO',
    todo,
  }
}

// reducer (pure function)
function todos(state = ['buy eggs','buy milk','pay bills'], action) {
  switch (action.type) {
    case 'ADD_TODO':
      console.log("ADD TODO action fired")
      console.log(action.text)
      return state.concat([ action.text ])
    default:
      return state
  }
}

// export combine reducers
export default combineReducers({
  todos
})
