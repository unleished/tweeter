"use strict";

// Simulates the kind of delay we see with network or filesystem operations


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection('tweets').insertOne(newTweet);
        callback(null, true);

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().toArray((err, tweets) => {

        // const sortNewestFirst = (a, b) => b.created_at - a.created_at;

        // callback(null, db.tweets.sort(sortNewestFirst));
        callback(null, tweets);
      });
    }

  };
}
