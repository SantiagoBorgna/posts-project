
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');

const homeStartingContent = "This is a page that will help you remembering what you´ve made each day.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];

app.get("/", function (req, res){
    res.render("home", {content: homeStartingContent, posts: posts});

});

app.get("/about", function (req, res){
    res.render("about", {content: aboutContent});
});

app.get("/contact", function (req, res){
    res.render("contact", {content: contactContent});
});

app.get("/compose", function (req, res){
    res.render("compose");
});

app.post("/", function (req, res){
    res.redirect("/compose");
});

app.post("/compose", function (req, res){
    const post = {
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:any", function (req, res){

    let urlTitle = lodash.lowerCase(req.params.any);

    posts.forEach(function (post){
        let postTitle = lodash.lowerCase(post.title);

        if (postTitle === urlTitle){
            //let truncatedContent = post.content.substring(0, 99) + "...";

            res.render("post", {
                title: post.title,
                par: post.content});
        }
    })
});



app.listen(process.env.PORT || 3000, function() {
  //console.log("Server started on port 3000");
});
