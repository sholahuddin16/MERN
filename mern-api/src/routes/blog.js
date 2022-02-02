const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const blogControler = require('../controllers/blog');

//[POST] : /v1/blog/post
router.post('/post', [
    body('title')
        .isLength({ min: 5 })
        .withMessage('Input title tidak sesuai'),
    body('body')
        .isLength({ min: 5 })
        .withMessage('Input body tidak sesusai')],
    blogControler.createBlogPost);

router.get('/get', blogControler.getAllBlogPost); //page=1&perPage=5

router.get('/get/:postId', blogControler.getBlogPostById);

router.put('/post/:postId', [
    body('title')
        .isLength({ min: 5 })
        .withMessage('Input title tidak sesuai'),
    body('body')
        .isLength({ min: 5 })
        .withMessage('Input body tidak seusai')], 
        blogControler.updateBlogPost);

router.delete('/post/:postId', blogControler.deleteBlogPost);

module.exports = router;