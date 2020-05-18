import blogReducer from './blogReducer'
import currentUserReducer from './currentUserReducer'
import notificationReducer from './notificationReducer'
import usersReducer from './usersReducer'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    blogs: blogReducer,
    currentUser: currentUserReducer,
    notification: notificationReducer,
    users: usersReducer
})

export default allReducers