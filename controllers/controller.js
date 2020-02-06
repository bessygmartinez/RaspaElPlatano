var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
const axios = require("axios");

var Comment = require('../models/Comment.js');
var Article = require('../models/Article.js');


router.get('/', function (req, res){
  res.redirect('/scrape');
});

router.get('/articles', function (req, res){
  Article.find().sort({_id: 1})
    .populate('comments')
    .exec(function(err, doc){
      if (err){
        console.log(err);
      } else {
        var hbsObject = {articles: doc}
        res.render('index', hbsObject);
      }
    });

});

router.get('/scrape', function(req, res) {
  axios.get('https://theplantain.com/').then(function(response) {
    var $ = cheerio.load(response.data);
    
    var titlesArray = [];

    //breaking news
    $('.breaking-news li').each(function(i, element) {
        const result = {};

        result.title = $(this).text().trim() + "";

        result.link = $(this).find('a').attr('href').trim();

        result.summary = $(this).text().trim() + ""; 
    
        if(result.title !== "" &&  result.summary !== ""){
          if(titlesArray.indexOf(result.title) == -1){
            titlesArray.push(result.title);

            Article.countDocuments({ title: result.title}, function (err, test){
              if(test == 0){
                var entry = new Article (result);

                entry.save(function(err, doc) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(doc);
                  }
                });
              } else {
                console.log('Redundant Database Content. Not saved to DB.')
              }
            });
        } else {
          console.log('Redundant Onion Content. Not Saved to DB.')
        }
      } else{
        console.log('Empty Content. Not Saved to DB.')
      }
    });

    //other headlines
    $('h2.entry-title').each(function(i, element) {
        const result = {};

        result.title = $(this).text().trim() + "";

        result.link = $(this).find('a').attr('href').trim();

        result.summary = $(this).text().trim() + ""; 
    
        if(result.title !== "" &&  result.summary !== ""){
          if(titlesArray.indexOf(result.title) == -1){
            titlesArray.push(result.title);

            Article.countDocuments({ title: result.title}, function (err, test){
              if(test == 0){
                var entry = new Article (result);

                entry.save(function(err, doc) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(doc);
                  }
                });
              } else {
                console.log('Redundant Database Content. Not saved to DB.')
              }
            });
        } else {
          console.log('Redundant Onion Content. Not Saved to DB.')
        }
      } else{
        console.log('Empty Content. Not Saved to DB.')
      }
    });

    res.redirect("/articles");
  });
});

router.post('/add/comment/:id', function (req, res){
  var articleId = req.params.id;
  var commentAuthor = req.body.name;
  var commentContent = req.body.comment;
  var result = {
    author: commentAuthor,
    content: commentContent
  };

  var entry = new Comment (result);

  entry.save(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      Article.findOneAndUpdate({'_id': articleId}, {$push: {'comments':doc._id}}, {new: true})
      .exec(function(err, doc){
        if (err){
          console.log(err);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });

});

router.post('/remove/comment/:id', function (req, res){
  var commentId = req.params.id;

  Comment.findByIdAndRemove(commentId, function (err, todo) {      
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;