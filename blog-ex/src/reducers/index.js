import blogReducer from './blogReducer'
import currentUserReducer from './currentUserReducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    blogs: blogReducer,
    currentUser: currentUserReducer
})

export default allReducers