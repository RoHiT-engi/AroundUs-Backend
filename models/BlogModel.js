import Mongoose from "mongoose";

const BlogSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
        ref: 'Blog',
    },
    name: {
        type: String,
        required: true,
        ref: 'Blog',
    },
    blog_title: {
        type: String,
        required: true,
        ref: 'Blog',
    },
    blog_description: {
        type: String,
        required: true,
        ref: 'Blog',
    },
    blog_content: {
        type: String,
        required: true,
        ref: 'Blog',
    }
},{
    timestamps: true,
  });

  const Blog = Mongoose.model('Blog', BlogSchema);
export default Blog;