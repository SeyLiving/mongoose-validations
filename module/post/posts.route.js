const router = require("express").Router;
const {createPost, getAllPost} = require("./posts.controllers");

const postsRouter = router();

postsRouter.route("/").get(getAllPost).post(createPost);

module.exports = postsRouter;
