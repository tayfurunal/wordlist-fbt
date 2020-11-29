const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [[check('tr', 'Text is required').not().isEmpty()]],
  [[check('en', 'Text is required').not().isEmpty()]],
  [[check('name', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ name: req.body.name });

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const newPost = new Post({
        tr: req.body.tr,
        en: req.body.en,
        user: req.body.name
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts/:name
// @desc     Get all posts by user
// @access   Private
router.get('/:name', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.name });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts?id
// @desc     Get post by ID
// @access   Private
router.get('/', async (req, res) => {
  try {
    const post = await Post.findById(req.query.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/:id
// @desc     Update a post
// @access   Private
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (req.body.en) post.en = req.body.en;
    if (req.body.tr) post.tr = req.body.tr;

    await post.save();

    res.json({ msg: 'Post updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
