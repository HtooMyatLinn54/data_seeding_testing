const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get all posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find().populate('author');
  res.json(posts);
});

module.exports = router;
