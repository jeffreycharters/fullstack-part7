const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return state.concat(action.data.user)
    case 'CLEAR_USERS':
      return []
    default:
      return state
  }
}

export const addUser = user => {
  return {
    type: 'ADD_USER',
    data: { user }
  }
}

export const clearUsers = () => {
  return { type: 'CLEAR_USERS' }
}

export default userReducer