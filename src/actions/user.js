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

async function requestAllUserData() {
  const response = await $.ajax({
    url: `http://localhost:3000/api/users`,
    method: 'GET',
    dataType: 'json',
    timeout: 100000,
  })
  return initUserData(response)
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
