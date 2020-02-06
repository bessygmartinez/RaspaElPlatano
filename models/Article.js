var moment = require("moment");
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  updated: {
    type: String,
    default: moment().format('MMM Do YYYY, h:mm a')
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;