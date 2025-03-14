const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication1');

const Blog = require('./models/blog');

const userRoute = require('./routes/user1');
const blogRoute = require('./routes/blog');

const app = express();
const PORT = 8002;

mongoose.connect('mongodb://localhost:27017/EchoSphere')
    .then(e => console.log("MongoDB Connected!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use((req, res, next) => {
    res.locals.user = req.user; // Attach req.user to res.locals
    next();
});

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    //desending order m sort kr rahe h
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
})

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))