import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './core/redux/reducers/rootReducer'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.scss'

const store = createStore(rootReducer, applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
reportWebVitals()
