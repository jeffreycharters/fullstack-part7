const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        case 'ADD_LIKE':
            const id = action.data.id
            const blogToLike = state.find(b => b.id === id)
            const likedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1
            }
            return state.map(blog =>
                blog.id === id ? likedBlog : blog)
        default:
            return state
    }
}

export const addBlog = blog => {
    return {
        type: 'NEW_BLOG',
        data: blog
    }
}

export const addLike = id => {
    return {
        type: 'ADD_LIKE',
        data: { id }
    }
}

export const deleteBlog = id => {
    return {
        type: 'DELETE_BLOG',
        data: { id }
    }
}

export default blogReducer