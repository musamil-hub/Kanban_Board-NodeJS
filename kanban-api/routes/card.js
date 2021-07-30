const express = require('express');
const router = express.Router();

const postCardController = require('../controllers/postCardController');

router.get('/', postCardController.getPosts);

router.post('/', postCardController.createPosts);

router.put('/:id', postCardController.updatePosts);

router.delete('/:id', postCardController.deletePosts);

module.exports = router;
