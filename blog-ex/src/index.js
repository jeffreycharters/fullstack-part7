import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Container from '@material-ui/core/Container'

import allReducers from './reducers'

const store = createStore(allReducers)

ReactDOM.render(
    <Provider store={store}>
        <Container>
            <App />
        </Container>
    </Provider>, document.getElementById('root'))