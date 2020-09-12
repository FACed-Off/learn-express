const express = require("express");
const PORT = process.env.PORT || 3000;
const templates = require("./templates");

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
  console.log(newPost);
  posts.push(newPost);
  res.redirect("/posts");
});
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
