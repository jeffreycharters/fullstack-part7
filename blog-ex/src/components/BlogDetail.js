import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogDetails = ({ handleLike, handleRemove }) => {
  const currentUser = useSelector(state => state.currentUser)
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)
  if (!blog) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <h1>{blog.title}</h1>

      <div>
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes
        <button onClick={() => handleLike(blog.id)}>like</button><br />
        Added by {blog.user.name}
        {currentUser.username === blog.user.username ?
          <><br /><button onClick={() => handleRemove(blog.id)}>remove</button></>
          : ''
        }
      </div>
    </div>
  )
}


export default BlogDetails