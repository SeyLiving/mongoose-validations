const Post = require("./post.module");


// Get All Post
exports.getAllPost = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
};


// Create Post
exports.createPost = async (req, res) => {
  const { title, body } = req.body;

  const post = await Post.create({
    title,
    body,
  });
  res.status(201).json({ post });
};


// Get Single Post
exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  res.status(200).json({ post });
};


// Update Post
exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByIdAndUpdate(
    postId, 
    { ...req.body }, 
    {new: true }
    );
    res.status(200).json({ post })
};


// Delete Post

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByIdAndDelete(postId);
  res.status(200).json({msg: "Post deleted successfully"});
};