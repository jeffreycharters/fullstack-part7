import React, { useState } from 'react'

const NoteForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleAuthorChange = (event) => setNewAuthor(event.target.value)
    const handleTitleChange = (event) => setNewTitle(event.target.value)
    const handleUrlChange = (event) => setNewUrl(event.target.value)

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            Title: <input
                id="blogTitle"
                value={newTitle}
                onChange={handleTitleChange}
            />

            <br />
            Author: <input
                id="blogAuthor"
                value={newAuthor}
                onChange={handleAuthorChange}
            />
            <br />
            URL: <input
                id="blogUrl"
                value={newUrl}
                onChange={handleUrlChange}
            />
            <br />
            <button type="submit" id="blogSave">save</button>
        </form>
    )
}

export default NoteForm