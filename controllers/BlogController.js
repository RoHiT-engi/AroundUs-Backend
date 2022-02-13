import Blog from '../models/BlogModel.js';
import asyncHandler from 'express-async-handler';


// @desc Create a Blog
// @route POST /api/Blog/addblog
// @access Private
const addBlog = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        blog_title,
        blog_description,
    } = req.body;
    if(req.query.apiID === process.env.API_ID) {
    const userExists = await Blog.findOne({ email,blog_title });
    if(userExists) {
        res.status(400);
        throw new Error('blog already exists');
    }

    const blog = await Blog.create({
        name,
        email,
        blog_title,
        blog_description,
    });

    if(blog){
        res.status(201).json({
            _id : blog._id,
            name : blog.name,
            email : blog.email,
            blog_title : blog.blog_title,
            blog_description : blog.blog_description,
            status : "success",
        });
    }else{
        res.status(400);
        throw new Error('Blog not created || invalid data');
    }}else{
        res.status(400);
        throw new Error('Invalid Access');
    }
});


// @desc    Get Blog 
// @route   GET /api/Blog/Action/:id
// @access  Private
const getBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if(req.query.apiID === process.env.API_ID){
    if(blog){
        res.status(200).json({
            _id : blog._id,
            name : blog.name,
            email : blog.email,
            profession : blog.profession,
            zipcode : blog.zipcode,
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }}
    else{
        res.status(400);
        throw new Error('Invalid Access');
    }
});

// @desc    Update Blog profile
// @route   PUT /api/users/Action/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params._id);
    if(req.query.apiID === process.env.API_ID){
    if(blog){
        const {
            name,
            email,
            blog_title,
            blog_description,
        } = req.body;

        blog.name = name || blog.name;
        blog.email = email || blog.email;
        blog.blog_title = blog_title || blog.blog_title;
        blog.blog_description = blog_description || blog.blog_description;

        const updatedBlog = await blog.save();
        res.status(200).json({
            _id : updatedBlog._id,
            name : updatedBlog.name,
            email : updatedBlog.email,
            blog_title : updatedBlog.blog_title,
            blog_description : updatedBlog.blog_description,
            data: updatedBlog
        });
    }else{
        res.status(404);
        throw new Error('Blog not found');
    }}
    else{
        res.status(400);
        throw new Error('Invalid Access');
    }
});


// @desc    Get all Blogs
// @route   GET /api/blogs/all
// @access  Private/Admin
const getAllblogs = asyncHandler(async (req, res) => {
    if(req.query.apiID === process.env.API_ID){
    const blogs = await Blog.find({});
    if(blogs){
        res.status(200).json(blogs);
    }else{
        res.status(404);
        throw new Error('No blogs in database');
    }}
    else{
        res.status(400);
        throw new Error('Invalid Access');
    }
});

// @desc    Delete blog
// @route   DELETE /api/blog/Action/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params._id);
    if(req.query.apiID === process.env.API_ID){
    if(blog){
        await blog.remove();
        res.status(200).json({
            message: 'blog deleted successfully'
        });
    }else{
        res.status(404);
        throw new Error('blog not found');
    }}
    else{
        res.status(400);
        throw new Error('Invalid Access');
    }
});

export {
    addBlog,
    getBlog,
    updateBlog,
    getAllblogs,
    deleteBlog
};