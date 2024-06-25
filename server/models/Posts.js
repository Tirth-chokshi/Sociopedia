import mongoose from "mongoose";

const postSchma = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,

        },
        firstName: {
            type: String,
            required: true,

        },
        lastName: {
            type: String,
            required: true,

        },
        location: { type: String },
        description: { type: String },
        picturePath: { type: String },
        userPicturePath: { type: String },
        likes: {
            type: Map,
            of: Boolean,
        },
        comment: {
            types: Array,
            default: []
        },
    }, { timestamps: true }
)

const Post = mongoose.model('Post',postSchma);
export default Post;