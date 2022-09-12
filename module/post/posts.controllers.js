const Post = require("./post.module");

exports.getAllPost = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
};

exports.createPost = async (req, res) => {
  const { title, body } = req.body;

  const post = await Post.create({
    title,
    body,
  });
  res.status(201).json({ post });
};
