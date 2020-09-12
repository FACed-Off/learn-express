const express = require("express");
const PORT = process.env.PORT || 3000;
const templates = require("./templates");
const { reset } = require("nodemon");

const server = express();

let posts = [{ author: "oli", title: "hello", content: "lorem ipsum etc" }];

server.get("/", (req, res) => {
  const html = templates.home();
  res.send(html);
});

server.get("/new-post", (req, res) => {
  res.send(templates.newPost());
});

server.get("/posts", (req, res) => {
  res.send(templates.allPosts(posts));
});

server.post("/new-post", express.urlencoded(), (req, res) => {
  const newPost = req.body;
  //console.log(newPost);
  posts.push(newPost);
  res.redirect("/posts");
});

server.get("/posts/:title", (req, res) => {
  // console.log(req.params.title);
  const post = posts.find((p) => p.title === req.params.title);
  const html = templates.post(posts);
  res.send(html);
});
//sends the title in the url

server.get("/delete-post/:title", (req, res) => {
  posts = posts.filter((p) => p.title !== req.params.title);
  res.redirect("/posts");
});
//deletes the post and redirects back to posts pagr

server.use(express.static("workshop/public"));

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
