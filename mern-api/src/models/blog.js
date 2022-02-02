const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = new Schema ({
    title: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    }  ,
    author: {
        type: Object,
        require: true,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('BlogPost', BlogPost);