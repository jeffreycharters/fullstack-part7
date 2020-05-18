import blogReducer from './blogReducer'
import currentUserReducer from './currentUserReducer'
import notificationReducer from './notificationReducer'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    blogs: blogReducer,
    currentUser: currentUserReducer,
    notification: notificationReducer
})

export default allReducers