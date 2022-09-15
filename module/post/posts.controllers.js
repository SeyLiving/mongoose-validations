const Post = require("./post.model");

const verifyAuthor = async (req, res) => {
let post = await Post.findById(postId);
if (post._id.toString() !== user.req.id) {
  return res
    .status(406)
    .json({ error: "You are not permitted to perform this operation" });
}
};

// Get All Post
exports.getAllPost = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
};

exports.getAllPostsByUser = async (req, res) => {
  const posts = await Post.find({ author: req.user.id });
  res.status(200).json({ posts });
}; 

// Create Post
exports.createPost = async (req, res) => {
  const { title, body } = req.body;

  const post = await Post.create({
    title,
    body,
    author: req.user.id,
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

  // checks
  await verifyAuthor();

  post = await Post.findByIdAndUpdate(
    postId, 
    { ...req.body }, 
    {new: true }
    );
    res.status(200).json({ post })
};


// Delete Post
exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  await verifyAuthor();

  const post = await Post.findByIdAndDelete(postId);
  res.status(200).json({msg: "Post deleted successfully"});
};