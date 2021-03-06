
const express = require('express');
const Post = require('../mongoMedel/post');
// const query = require('../mongoMedel/query');
const { isLoggedIn } = require('../middlewares/checkLogin');

const router = express.Router();


router.get('/', async (req, res) => {
  const posts = await Post.find({}).sort({ date: 1 });
  res.json({
    ok: true,
    message: null,
    result: posts,
  });
});

router.post('/', isLoggedIn, async (req, res) => {
  const { _id } = req.user;
  // const result = await query.Post.create(req.body, _id);
  const post = new Post();
  post.todo = req.body.todo;
  post.date = req.body.date;
  post.content = req.body.content;
  post.status = req.body.status;
  post.priority = req.body.priority;
  post.userId = _id;
  post.save();
  res.json({
    ok: true,
    message: null,
    post,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const posts = await Post.find({ _id: id });
  res.json({
    ok: true,
    message: null,
    result: posts,
  });
});

router.put('/:_id', isLoggedIn, async (req, res) => {
  const { _id } = req.params;
  const { _id: userId } = req.user;
  const {
    todo,
    date,
    content,
    status,
    priority,
  } = req.body;
  const post = await Post.findOne({ _id });
  post.todo = todo;
  post.date = date;
  post.content = content;
  post.status = status;
  post.priority = priority;
  post.userId = userId;
  const result = post.save();
  res.json({
    ok: true,
    message: null,
    result,
  });
});


router.delete('/:_id', isLoggedIn, async (req, res) => {
  const { _id } = req.params;
  const result = await Post.deleteOne({ _id });
  res.json({
    ok: true,
    message: null,
    result,
  });
});

module.exports = router;
