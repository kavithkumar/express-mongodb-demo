const express = require('express')
const { authMiddleware } = require('../middleware/auth')
const { createBlog, getAllBlogs, findBlogById, updateBlog, updateLikes } = require('../controllers/blogcontroller')

const routes = express.Router()
//ROUTES ARE ADDED BELOW
routes.post('/', authMiddleware, createBlog)
routes.get('/', getAllBlogs)
routes.get('/:id', findBlogById)
routes.post('/:id', updateBlog)-
routes.put('/', updateLikes)
module.exports = routes                              