import User from '../lib/records/User'
import Skill from '../lib/records/Skill'
import Skills from '../lib/records/Skills'
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

function setLoggedInUser(user) {
  return {
    type: 'SET_LOGGED_IN_USER',
    user
  }
}

function setLoading(fetchState) {
  return {
    type: 'FETCH_STATE_UPDATE',
    fetchState
  }
}

function setCurrentSkill(SkillData) {
  return {
    type: 'SET_CURRENT_SKILL',
    SkillData
  }
}

async function requestAllUserData() {
  const response = await $.ajax({
    url: `https://skill-suggest-api.herokuapp.com/api/users`,
    method: 'GET',
    dataType: 'json',
    timeout: 100000,
  })
  return initUserData(response)
}

async function requestUserData(id) {
  const response = await $.ajax({
    url: `https://skill-suggest-api.herokuapp.com/api/users/${id}`,
    method: 'GET',
    dataType: 'json',
    timeout: 100000,
  })
  console.log("got user data")
  console.log(response)
  return User.fromJS(response)
}

async function requestSkillData (skillName) {
  const response = await $.ajax({
    url: `https://skill-suggest-api.herokuapp.com/api/skills/?name=${skillName}`,
    method: 'GET',
    dataType: 'json',
    timeout: 100000,
  })
  console.log("got skill data!!!")
  console.log(response)
  console.log(Skills.fromJS(response))
  return Skills.fromJS(response)
}

async function attemptSignUp(user) {
  const body = {
    user: {
      name:user.name,
      age:user.age,
      job:user.job,
      password:user.password,
      password_confirmation:user.passwordConfirmation
    }
  }
  const response = await $.ajax({
    url:`https://skill-suggest-api.herokuapp.com/api/users`,
    method:'POST',
    data: body,
    dataType:'json',
    timeout:10000,
  })
  console.log("Got a response from server attempting to create a user")
  console.log(response)
  return response
}

async function attemptLogIn(user) {
  const body = {
    session: {
      name: user.name,
      password: user.password
    }
  }
  console.log(body)
  const response = await $.ajax({
    url: 'https://skill-suggest-api.herokuapp.com/login',
    method: 'POST',
    data: body,
    dataType:'json',
    timeout:10000,
  })
  console.log("Got a response from server attempting to login")
  console.log(response)
  return response
}

async function attemptPostingNewSkill(params) {
  console.log('attemptPostingNewSkill called')
  console.log(params)
  const response = await $.ajax({
    url: `https://skill-suggest-api.herokuapp.com/api/users/${params.user_id}/skills`,
    method: 'POST',
    headers: {
      'Authorization': localStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params,
    dataType: 'json',
    timeout: 10000,
  })
  console.log("got a response from server attempting to post new skill")
  console.log(response)
  return response
}

export function getAllUserData() {
  console.log('getAllUserData called')
  return async(dispatch) => {
     dispatch(setLoading(true)) // toggle loader
    try {
      const allUserData = await requestAllUserData()
      dispatch(setAllUserData(allUserData))
    } catch(error) {
      console.log("error", error)
    }
      dispatch(setLoading(false)) // toggle loader
  }
}

export function getCurrentUser(id) {
  console.log('get UserData action called')
  return async(dispatch) => {
      dispatch(setLoading(true)) // toggle loader
    try {
      const UserData = await requestUserData(id)
      dispatch(setCurrentUser(UserData))
    } catch(error) {
      console.log("error", error)
    }
      dispatch(setLoading(false)) // toggle loader
  }
}

export function getCurrentSkill (skillName) {
  console.log('get currentSkill action called')
  return async(dispatch) => {
      dispatch(setLoading(true)) // toggle loader
    try {
      const SkillData = await requestSkillData(skillName)
      dispatch(setCurrentSkill(SkillData))
    } catch(error) {
      console.log("error", error)
    }
      dispatch(setLoading(false)) // toggle loader
  }
}

export function clearCurrentUser() {
  console.log("clearCurrentUser called")
  return {
    type: 'CLEAR_CURRENT_USER',
    null
  }
}

export function logInFail() {
  console.log("firing logInFail action")
  return {
    type: 'LOGIN_FAILED',
    null
  }
}

export function disableLogInMessage() {
  console.log("disableLogInMessage action called")
  return {
    type: 'DISABLE_LOGIN_MESSAGE',
    null
  }
}

export function logOutUser() {
  console.log("logOutUser action called")
  return {
    type: 'LOG_OUT_USER',
    null
  }
}

export function resetErrorMessage() {
  console.log("resetErrorMessage action called")
  return {
    type: 'LOGIN_SUCCESS',
    null
  }
}

export function handleCancel() {
  console.log("handleCancel action called")
  return {
    type: 'REMOVE_LOGINERROR'
  }
}

export function signUpUser(user) {
  console.log('recieved create User Action...')
  return async(dispatch) => {
    try {
      const LogIn = await attemptSignUp(user)
      dispatch(setLoggedInUser(LogIn))
      // return id for reroute
      return LogIn
    } catch(error) {
      console.log("error", error)
    }
  }
}

export function logInUser(user) {
  console.log('logInUser action fired')
  return async(dispatch) => {
    try {
      const loggedInUser = await attemptLogIn(user)
      dispatch(setLoggedInUser(loggedInUser))
      dispatch({type:'LOGIN_SUCCESS'})
      return loggedInUser
    } catch(error) {
      console.log("error", error)
      dispatch(logInFail())
      const user = {
        id: null,
        token: null
      }
      return user
    }
  }
}

export function postNewSkill(skill) {
  console.log('postNewSkill acction fired')
  return async(dispatch) => {
    try {
      const updatedSkills = await attemptPostingNewSkill(skill)
      console.log(updatedSkills)
      if(updatedSkills.redirectToLogIn) {
        return updatedSkills
      } else {
        dispatch(getCurrentUser(skill.user_id))
      }

    } catch(error) {
      console.log("error", error)
      return error
    }
    return skill
  }
}
