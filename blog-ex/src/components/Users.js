import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userService from '../services/users'
import { addUser } from '../reducers/usersReducer'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    userService.getAll().then(users =>
      users.map(user => dispatch(addUser(user))))
  }, [dispatch])
  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blog</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div >
  )
}

export default Users