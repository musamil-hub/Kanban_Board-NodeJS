const mongoose = require('mongoose');

const PostCards = mongoose.model(
  'PostCards',
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assign_to: { type: String, required: true },
    date: { type: String, required: true },
    color: { type: String, required: true },
  },
  'postCards'
);

module.exports = { PostCards };
