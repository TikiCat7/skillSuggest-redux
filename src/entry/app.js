// entry point for the react app

// import a bunch of things react, redux, react-router etc.
import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import _ from 'lodash'
import 'babel-polyfill'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// import container components
import TitleMain from '../containers/titleMain'
import UserFormContainer from '../containers/UserFormContainer'
import CurrentUserDataContainer from '../containers/CurrentUserDataContainer'

// import navbar component
import NavBar from '../components/navbar'

// import configureStore file
import configureStore from '../stores/configureAppStore'

// create store for the app
const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

// finally render the app
// wrap the app in with provider component with store as prop -> give access to all child components the store as props
// Router component with history prop -> figure out what the history prop is

// wrap with MuiThemeProvider to use material-ui library
const App = () => (
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={NavBar} >
            {/*<IndexRoute component={NavBar} />*/}
            <Route path="/main" component={TitleMain} />
            <Route path="/form" component={UserFormContainer} />
            <Route path="/user/:id" component={CurrentUserDataContainer} />
          </Route>
          </Router>
      </Provider>
    </MuiThemeProvider>
    )

ReactDOM.render(
  <App />,
  document.getElementById('mount')
)
