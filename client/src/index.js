import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import shoppingCartReducer from './store/reducers/shoppingCart'
import authReducer from './store/reducers/auth'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
const token  = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}
axios.defaults.headers.post['Content-Type'] = 'application/json';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: shoppingCartReducer,
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
