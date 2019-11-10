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
import userReducer from './store/reducers/user'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const rootReducer = combineReducers({
    user: userReducer,
    cart: shoppingCartReducer,
})

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action)
            const result = next(action)
            console.log('[Middleware] next state', store.getState())
            return result
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
