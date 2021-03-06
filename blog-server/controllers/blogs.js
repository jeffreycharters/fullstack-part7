const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: body.likes,
        author: body.author,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())

})

blogsRouter.get('/:id/comments', async (request, response) => {
    const comments = await Comment.find({ 'blog': request.params.id.toString() })
    response.json(comments.map(c => c.toJSON()))
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const comment = new Comment({
        blog: request.params.id,
        content: body.content
    })

    const savedBlog = await comment.save()
    response.status(201).json(savedBlog.toJSON())

})


blogsRouter.delete('/:id/comments', async (request, response, next) => {
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (decodedToken.id.toString() === user._id.toString()) {
        await Comment.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    }
    return response.status(401).json({ error: 'not authorized to perform this request' })
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (decodedToken.id.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    }
    return response.status(401).json({ error: 'not authorized to perform this request' })
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())

})

module.exports = blogsRouter