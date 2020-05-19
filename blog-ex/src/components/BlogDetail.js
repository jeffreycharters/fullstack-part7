import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import blogService from '../services/blogs'

import styled from 'styled-components'

const SexyBlog = styled.div`
  padding: 1em;
  background: papayawhip;
  border-radius: 0 0 10px 10px;
  font-family: sans-serif;
`

const Item = styled.div`
  padding: 0.5rem;
  line-height: 2rem;
`

const BlogDetails = ({ handleLike, handleRemove, handleComment }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const id = useParams().id
  const currentUser = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)


  useEffect(() => {
    blogService.getComments(id).then(comments =>
      setComments(comments.map(comment => comment.content))
    )
  }, [id])

  if (!blog) {
    return null
  }


  const changeHandler = event => {
    event.preventDefault()
    setComment(event.target.value)
  }

  const newComment = (event) => {
    event.preventDefault()
    handleComment(id, comment)
    setComments(comments.concat(comment))
  }

  const showComments = comments => {
    return (
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, i) =>
            <li key={i}>{comment}</li>)}
        </ul>
      </div>
    )
  }

  return (
    <SexyBlog >
      <h1>{blog.title}</h1>

      <Item>
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes
        <button onClick={() => handleLike(blog.id)}>like</button><br />
        Added by {blog.user.name}
        {currentUser.username === blog.user.username ?
          <><br /><button onClick={() => handleRemove(blog.id)}>remove</button></>
          : ''
        }
      </Item>
      <div>
        <form onSubmit={newComment}>
          Add comment: <input name="content" type="text" value={comment} onChange={changeHandler} />
          <button type="submit">submit</button>
        </form>
      </div>
      {comments && showComments(comments)}
    </SexyBlog>
  )
}


export default BlogDetails