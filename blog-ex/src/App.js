import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogDetail from './components/BlogDetail'
import Users from './components/Users'
import User from './components/User'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import storage from './utils/storage'

import { useSelector, useDispatch } from 'react-redux'
import { addBlog, addLike, deleteBlog } from './reducers/blogReducer'
import { addUser } from './reducers/usersReducer'
import { updateUser, logoutUser } from './reducers/currentUserReducer'
import { addNotification, clearNotification } from './reducers/notificationReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.currentUser)
  const notification = useSelector(state => state.notification)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      blogs.map(blog =>
        dispatch(addBlog(blog))
      )
    )
  }, [dispatch])

  useEffect(() => {
    const currentUser = storage.loadUser()
    if (currentUser) {
      dispatch(updateUser(currentUser))
    }

  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(users =>
      users.map(user => dispatch(addUser(user))))
  }, [dispatch])


  const notifyWith = (message, type = 'success') => {
    dispatch(addNotification(message, type))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(updateUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(newBlog))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch(addLike(id))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    storage.logoutUser()
  }

  const handleComment = async (id, comment) => {
    await blogService.addComment(id, comment)
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const padding = {
    padding: 5
  }

  return (
    <Router>

      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/blogs">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
        <span style={padding}>{user.name} logged in <button onClick={handleLogout}>logout</button></span>
      </div>

      <Notification notification={notification} />

      <Switch>

        <Route path="/blogs/:id">
          <BlogDetail handleLike={handleLike} handleRemove={handleRemove} handleComment={handleComment} />
        </Route>
        <Route path="/blogs">
          <h2>blogs</h2>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          {blogs.sort(byLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemove={handleRemove}
              own={user.username === blog.user.username}
            />
          )}
        </Route>

        <Route path="/users/:id">
          <User />
        </Route>

        <Route path="/users">
          <Users />
        </Route>

        <Route path="/">
          <h2>Home</h2>
          <p>Click the links above to do things. Or don't.</p>
        </Route>
      </Switch>
    </Router>
  )
}

export default App