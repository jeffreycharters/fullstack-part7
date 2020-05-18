import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const addBlog = (async (blogObject) => {
        try {
            await blogService.create(blogObject)
            blogFormRef.current.toggleVisibility()
            blogService.getAll().then(blogs =>
                setBlogs(blogs))
            setErrorMessage(`New blog ${blogObject.title} added!`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
        catch (exception) {
            setErrorMessage(`Error: ${exception}`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    })

    const deleteBlog = async (blogObject) => {
        try {
            await blogService.remove(blogObject)
            setErrorMessage(`Deleted blog ${blogObject.title}`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            await blogService.getAll().then(blogs =>
                setBlogs(blogs)
            )
        }
        catch (exception) {
            setErrorMessage(`Error: ${exception}`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = (() => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    })

    const blogFormRef = React.createRef()

    const blogForm = () => {
        return (
            <Togglable buttonLabel="Add new Blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
        )
    }


    const loginForm = () => {
        return (
            <div>
                <h2>log in first you bastard</h2>
                <div className="message">
                    {errorMessage}
                </div>

                <Togglable buttonLabel="Log In">
                    <LoginForm
                        handleLogin={handleLogin}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                    />
                </Togglable>
            </div >
        )
    }

    const addBlogLike = async (blogObject) => {
        try {
            await blogService.update(blogObject)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
        catch (exception) {
            setErrorMessage(`Error: ${exception}`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const sortedBlogs = () => {
        // Sort blogs by likes
        let mapped = blogs.map((blog, i) => {
            return { index: i, value: blog.likes }
        })
        mapped.sort((a, b) => {
            if (a.value > b.value) {
                return -1
            }
            if (a.value < b.value) {
                return 1
            }
            return 0
        })

        return mapped.map(blog => blogs[blog.index])
    }



    if (user === null) {
        return (
            loginForm()
        )
    }

    return (
        <div>
            <h2>blogs</h2>

            <div className="message">
                {errorMessage}
            </div>

            <p><b>{user.username}</b> logged in
                <button onClick={handleLogout}>Logout</button></p>

            {blogForm()}

            {

                sortedBlogs().map(blog =>
                    <Blog key={blog.id}
                        blog={blog}
                        addBlogLike={addBlogLike}
                        user={user}
                        deleteBlog={deleteBlog}
                    />
                )
            }
        </div >
    )
}

export default App