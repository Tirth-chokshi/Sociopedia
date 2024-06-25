import Post from '../models/Posts.js'
import User from '../models/User.js';

// Create Post

export const createPost = async (req,res) =>{
    try {
        const { userId, desciption , pictruePath }= req.body;
        const user = await User.findById(userId)
        const newPost = new Post({ // this will add a new post in post object
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.locaiton,
            desciption,
            userPictruePath: user.picturePath,
            pictruePath,
            likes: {},
            comments: []
        })
        await newPost.save(); // this will wait untill the current post will be saved 

        const post = await Post.find(); // this line list down all the post from post object
        res.status(201).json(post);
    } catch (error) {
 
    }
}

export const getFeedPosts = async (req,res)=>{
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ messsage: error.messsage })
    }
}

export const getUserPosts = async (req,res)=>{
    try {
        const {userId} = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ messsage: error.messsage })
    }
}
// Update
export const  likePost = async (req,res)=>{
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        
        if(isLiked){ // check if post is already liked by user then it will unlike (remove like)
            post.likes.delete(userId)
        }
        else { // if not liked then add the like
            post.likes.set(userId, true);
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}