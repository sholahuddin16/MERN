const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const BlogPost = require('../models/blog');
const { post } = require('../routes/blog');



exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //console.log('err : ', errors)
        const err = new Error('Input data tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image Harus diUpload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {
            uid: 123,
            name: "sasa"
        }
    })

    Posting.save()
        .then(result => {
            res.status(201).json({
                message: "Post Successfuly",
                data: result
            });

        }).catch(err => {
            console.log('err: ', err);
        });

}

exports.getAllBlogPost = (req, res, next) => {
    const currentPage = req.query.page || 1;  //var page sekarang dari url routes dengan oprator logika OR
    const perPage = req.query.perPage || 5;  //var per page dari url routes dengan oprator logika OR
    let totalItems;

    BlogPost.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return BlogPost.find()
                .skip((parseInt(currentPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage));
        })
        .then(result => {
            res.status(200).json({
                message: 'Data Blog Post Berhasil dipanggil',
                data: result,
                total_Data: totalItems,
                per_Page: parseInt(perPage),
                current_Page: parseInt(currentPage),
            })
        })
        .catch(err => {
            next(err);
        })
}

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
        .then(result => {
            if (!result) {
                const error = new Error('Blog Post Tidak ditemukan')
                error.errorStatus = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Data blog post berhasil dipanggil',
                data: result,
            })
        })
        .catch(err => {
            next(err);
        })
}

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //console.log('err : ', errors)
        const err = new Error('Input data tidak seusia');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image Harus diUpload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const postId = req.params.postId;

    BlogPost.findById(postId)
        .then(post => {
            if (!post) {
                const err = new Error('Blog Post Tidak ditemukan');
                err.errorStatus = 404;
                throw err;
            }

            post.title = title;
            post.body = body;
            post.image = image;

            return post.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Update Berhasil',
                data: result,
            })
        })
        .catch(err => {
            next(err)
        })
}

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;  //var postid dari url routes

    BlogPost.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Blog post tidak ditemukan');
                error.errorStatus = 404;
                throw error;
            }

            removeImage(post.image);
            return BlogPost.findByIdAndRemove(postId);
        })
        .then(result => {
            res.status(200).json({
                message: "Hapus Blog Post Berhasil",
                data: result,
            })
        })
        .catch(err => {
            next(err);
        })
}

const removeImage = (filePath) => {
    console.log('File Patch', filePath);
    console.log('dir name : ', __dirname);

    //C:\Users\Muhammad Sholahuddin\Documents\lartihan JS\mern\mern-api\images\1615734134431-df53c1f39a999f85a3728f0d1142d26d.png
    //image berdasarkan postID

    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err));
}