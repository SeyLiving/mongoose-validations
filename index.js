const express = require("express");
const postsRouter = require("./module/post/posts.route");
const { dbConnect } = require("./config/dbonnect");
const { authRouter } = require("./module/users/auth.route");


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Welcome to my server. use /post to gett all posts");
})
app.use("/auth", authRouter);
app.use("/posts", postsRouter);


async function start() {
    await dbConnect();

    app.listen(4004,() => {
        console.log("Server listening on http://localhost 4004");
    });
}
start()