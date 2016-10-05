import { combineReducers } from 'redux'
import { List } from 'immutable'

// import our immutable models
import User from '../lib/records/User'
import Skill from '../lib/records/Skill'

// import actions for our User model
import UserActions from '../actions/user'

function addTodo(todo) {
  return {
    type: 'ADD_TODO',
    todo,
  }
}

// reducer (pure function) NOT MADE WITH IMMUTABLEJS
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

function userList(state = new List(), action) {
//console.log('inside userList reducer')
//console.log(action)
  switch (action.type) {
    case 'ADD_USER':
      console.log("ADD USER action fired")
      console.log(action.users)
      return action.users
    default:
      break // do nothing
  }
  return state
}

function allUsers(state = new List(), action) {
  switch(action.type) {
    case 'SET_ALL_DATA':
      return action.allUserData
    default:
      break
    }
  return state
}

function currentUser(state = new User(), action) {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return action.currentUser
    case 'CLEAR_CURRENT_USER':
      console.log("clear CLEAR_CURRENT_USER action receieved")
      return new User()
    default:
      break
  }
  return state
}

function loggedInUser(state = {name: "null", loggedIn: false, logInInfo:false}, action) {
  switch(action.type) {
    case 'SET_LOGGED_IN_USER':
      state = {...action.user, loggedIn:true, logInInfo:true} // is this bad?
      return state
    case 'DISABLE_LOGIN_MESSAGE':
      return {...state, logInInfo:false} // REMEMBER, DON'T MUTATE STATE!!! logInStatus
    case 'JWT_EXISTS':
      return {...state, loggedIn:true, name:action.data.name, id:action.data.id} // set loggedIn State to true if jwt exists
    default:
      break
  }
  return state
}

function notification(state = {logInError: false}, action) {
  switch(action.type) {
    case 'LOGIN_FAILED':
        return {...state, logInError:true}
    default:
      break
  }
  return state
}

// export combine reducers
export default combineReducers({
  todos,
  userList,
  allUsers,
  currentUser,
  loggedInUser,
  notification
})
