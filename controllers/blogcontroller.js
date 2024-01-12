const CustomApiError = require('../error/customApiError');
const blog = require('../models/blog');
const Blog = require('../models/blog')
const User = require('../models/user1')

const createBlog = async (req, res) => {
    const blog = req.body;
    const user = req.user
    console.log(user)
    try {
        const userId = await User.findOne({ 'email': user.email })
        blog.author = userId;
        const createdBlog = await Blog.create(blog)
        res.status(200).json(createdBlog)
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blog.find();
        res.status(200).json(blogs)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
const findBlogById = async (req, res) => {
    const blogId = req.params.id;
    try {
        const blg = await blog.findById(blogId)
        res.status(200).json(blg)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
const updateBlog = async (req, res, next) => {
    const blogId = req.params.id;
    try {
        console.log(req.body);
        const updatedBlg = await blog.findByIdAndUpdate(blogId, req.body, { new: true });
        if (!updatedBlg)
            next(new CustomApiError(`cannot be updated...${blogId} doesnt exist..`, 400))
        else
            res.status(200).json(updatedBlg);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
const updateLikes = async (req, res, next) => {
    const blogLiked = req.body
    try {
        const blog = Blog.findOne({ _id: blogLiked._id })
        if (blogLiked.isLiked) body.likes++
        else blog.likes--
        const updatedBlog = await Blog.findOneAndUpdate(
            { _id: blog._id }, { likes: blog.likes }, { new: true }
        )
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        next(new CustomApiError(error.message, 500))
    }
}
module.exports = { createBlog, getAllBlogs, findBlogById, updateBlog, updateLikes }