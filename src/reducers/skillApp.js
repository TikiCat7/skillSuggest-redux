import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// import reducers for app
import skillApp from './skillAppReducers'

export default combineReducers({
  skillApp,
  form: formReducer,
  routing: routerReducer,
})
