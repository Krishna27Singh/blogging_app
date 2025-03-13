const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    //yaha se automatically createdby   user ki trf point krega 
}, {timestamps: true});

const Blog = model("blog", blogSchema);

module.exports = Blog;