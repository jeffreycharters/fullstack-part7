const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return state.concat(action.data.user)
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

export default userReducer