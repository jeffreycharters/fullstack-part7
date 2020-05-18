const currentUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return action.data
        case 'LOGOUT':
            return null
        default: return state
    }
}

export const updateUser = user => {
    return {
        type: 'UPDATE_USER',
        data: {
            username: user.username,
            name: user.name,
            token: user.token
        }
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT'
    }
}

export default currentUserReducer