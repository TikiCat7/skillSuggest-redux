import User from '../lib/records/User'
import Skill from '../lib/records/Skill'
import $ from 'jquery'
import { Record, List } from 'immutable'

export function addUser(addedUser, skillApp) {
  console.log('added user'+ addedUser)

  const previousUsers = skillApp
  const immutableUser = User.fromJS(addedUser)

  console.log(immutableUser)

  const users = previousUsers.push(immutableUser)

  console.log('prevoiusUsers + addedUser' + users)
    return {
      type:'ADD_USER',
      users
    }
}

function initLabels(labels) {
  return new List(labels.map((label) => {
    return Label.fromJS(label)
  }))
}

// turn it into list of user? YEP!
function initUserData(data) {
  //console.log(data)
  return new List(data.map((user) => {
    //console.log(user)
    return User.fromJS(user)
  }))
}

function setAllUserData(allUserData) {
  return {
    type: 'SET_ALL_DATA',
    allUserData
  }
}

function setCurrentUser(currentUser) {
  return {
    type: 'SET_CURRENT_USER',
    currentUser
  }
}

async function requestAllUserData() {
  const response = await $.ajax({
    url: `http://localhost:3000/api/users`,
    method: 'GET',
    dataType: 'json',
    timeout: 100000,
  })
  return initUserData(response)
}

async function requestUserData(id) {
  const response = await $.ajax({
    url: `http://localhost:3000/api/users/${id}`,
    method: 'GET',
    dataType: 'json',
    timeout: 100000,
  })
  console.log("got user data")
  console.log(response)
  return User.fromJS(response)
}


export function getAllUserData() {
  console.log('getAllUserData called')
  return async(dispatch) => {
    // dispatch(setLoading(true)) // toggle loader
    try {
      const allUserData = await requestAllUserData()
      dispatch(setAllUserData(allUserData))
    } catch(error) {
      console.log("error", error)
    }
    //dispatch(setLoading(false)) // toggle loader
  }
}

export function getCurrentUser(id) {
  console.log('get UserData action called')
  return async(dispatch) => {
    try {
      const UserData = await requestUserData(id)
      dispatch(setCurrentUser(UserData))
    } catch(error) {
      console.log("error", error)
    }
  }
}

export function clearCurrentUser() {
  console.log("clearCurrentUser called")
  return {
    type: 'CLEAR_CURRENT_USER',
    null
  }
}
