const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const reviewSchema = new Schema({
    id: ObjectId,
    body: String,
    userId: String
  });
  
exports.Review = mongoose.model('Review', reviewSchema);

