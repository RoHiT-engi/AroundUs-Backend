import express from 'express';
const router = express.Router();
import {
    addBlog,
    getBlog,
    updateBlog,
    getAllblogs,
    deleteBlog
} from '../controllers/BlogController.js';


router.route('/addblog').post(addBlog);
router.route('/Action/:_id')
    .get(getBlog)
    .put(updateBlog)
    .delete(deleteBlog);
router.route('/all').get(getAllblogs);

export default router;