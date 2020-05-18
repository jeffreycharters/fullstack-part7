const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const addNotification = (message, type) => {
    return {
        type: 'ADD_NOTIFICATION',
        data: { message, type }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer