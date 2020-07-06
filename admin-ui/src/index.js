import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducer as authReducer } from './store/reducers/auth'
import { reducer as modalReducer } from './store/reducers/modal'
import { reducer as popUpReducer } from './store/reducers/popup'


axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  popup: popUpReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
