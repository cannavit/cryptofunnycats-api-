const express = require('express');
const Post = require('./model/Post'); // new
const router = express.Router();

// Get all posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// curl http://localhost:5000/api/posts

router.post('/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  await post.save();
  res.send(post);
});

// curl http://localhost:5000/api/posts \
//     -X POST \
//     -H "Content-Type: application/json" \
//     -d '{"title":"Post 1", "content":"Lorem ipsum"}'

router.get('/posts/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.send(post);
});

// curl http://localhost:5000/api/posts/<OBJECT_ID>
// curl http://localhost:5000/api/posts/60ccf14b8e95302f0e99295f

router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

module.exports = router;
