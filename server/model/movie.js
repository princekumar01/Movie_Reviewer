const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    id: ObjectId,
    imdbId:{type: String, required: true, unique: true}, 
    title: {type: String, required: true} ,
    releaseDate: String,
    trailerLink: String,
    genres: [ String ],
    poster: String,
    backdrops: [ String ],
    reviewIds: [ {id: ObjectId,
      body: String,
      userId: String} ]
  });
  
exports.Movie = mongoose.model('Movie', movieSchema);
