import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
    const [visible, setVisible] = useState(false)

    const label = visible ? 'hide' : 'view'

    return (
        <div className='blog'>
            <div>
                <Link to={`/blogs/${blog.id}`}> <i>{blog.title}</i></Link> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
            </div>
            {visible && (
                <div>
                    <div>{blog.url}</div>
                    <div>likes {blog.likes}
                        <button onClick={() => handleLike(blog.id)}>like</button>
                    </div>
                    <div>{blog.user.name}</div>
                    {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
                </div>
            )}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    own: PropTypes.bool.isRequired
}

export default Blog