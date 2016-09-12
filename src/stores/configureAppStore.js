// imports some stuff from redux to create app store
import { createStore, applyMiddleware, compose } from 'redux'

// import thunk from redux-thunk as Middlewares
import thunk from 'redux-thunk'

// import reducers for the app (combined reducers result)
import reducer from '../reducers/skillApp'

// exporting the function configureStore which uses redux's createStore() function
// it takes a reducer, or combinedReducer in this case, and initial state as 2nd parameter
// compose(applyMiddleware(thunk)) applies the redux-thunk middle ware to the store?
export default function configureStore(_initialData) {
  const store = createStore(
    reducer,
    undefined,
    // Middlewares
    // use compose to apply multiple Middlewares
    // in this example applyMiddleware(thunk) is for redux-thunk
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

// hot reload reducers
  module.hot.accept('../reducers/skillApp', () => {
    //using replaceReducer to hot reload reducers
    store.replaceReducer(require('../reducers/skillApp').default)
  })

// finally return the configured store
  return store
}
