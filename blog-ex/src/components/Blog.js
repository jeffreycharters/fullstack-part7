import React, { useState } from 'react'

const Blog = ({ blog, addBlogLike, deleteBlog, user }) => {

    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        width: 600,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 3,
        lineHeight: 1.3,
    }

    const isUsersBlog = () => {
        return (blog.user.username === user.username)
    }

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const showDeleteButton = { display: isUsersBlog() ? '' : 'none' }

    const addLike = (event) => {
        event.preventDefault()
        addBlogLike({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: likes + 1,
            user: blog.user.id,
            id: blog.id
        })
        setLikes(likes + 1)
    }

    const removeBlog = (event) => {
        event.preventDefault()
        deleteBlog(blog)

    }


    return (
        <div style={blogStyle}>
            <div className="basicContent">
                {blog.title} - {blog.author}
                <button style={hideWhenVisible} onClick={() => setVisible(true)}>details</button>
                <button style={showWhenVisible} onClick={() => setVisible(false)}>close</button>
                <div style={showWhenVisible} className="extendedContent">
                    <b>URL:</b> {blog.url}<br />
                    <b>Likes:</b> <span className="likesNumber">{likes}</span> &nbsp;
                    <button onClick={addLike} className="likeButton">Like</button>
                    <br />
                    <b>Added by:</b> {blog.user.username}<br />
                    <div style={showDeleteButton}>
                        <button onClick={removeBlog}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog
