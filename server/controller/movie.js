const fs = require('fs');
const model = require('../model/movie')
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Movie = model.Movie;
const modelReview = require('../model/review')
const Review = modelReview.Review;
const modelUser = require('../model/user')
const User = modelUser.User;

// Create
exports.createReview = async(req, res) => {
  const {imdbId} = req.body;

    const review = new Review(req.body);
    let movie = await Movie.findOne({imdbId:imdbId});
    movie.reviewIds.push(review);
  
    try{
      const doc = await Movie.findOneAndUpdate({imdbId:imdbId},movie,{new:true})
      console.log(doc);
      res.status(201).json(review);
      }
      catch(err){
        console.log(err);
        res.status(400).json(err);
      }
};

exports.deleteReview = async (req, res) => {
  const {imdbId,_id} = req.body;
  console.log(_id);
  let movie = await Movie.findOne({imdbId:imdbId})
  movie.reviewIds=(movie.reviewIds).filter(r=>r._id!=_id)
  console.log(movie);
  try{
    const doc = await Movie.findOneAndUpdate({imdbId:imdbId},movie,{new:true})
    console.log(doc);
    res.status(201).json(doc);
    }
    catch(err){
      console.log(err);
      res.status(400).json(err);
    }
};


exports.updateReview = async(req, res) => {
  const {imdbId, body,_id} = req.body;

    //const review = new Review(req.body);
    let movie = await Movie.findOne({imdbId:imdbId});
    const index = movie.reviewIds.findIndex(r=>r._id==_id);
    console.log(index);
    movie.reviewIds[index].body=body;
    console.log(movie);
    try{
      const doc = await Movie.findOneAndUpdate({imdbId:imdbId},movie,{new:true})
      console.log(doc);
      res.status(201).json(movie);
      }
      catch(err){
        console.log(err);
        res.status(400).json(err);
      }
};


exports.getWatchList =async(req,res)=>{
  const movies = await Movie.find();
  console.log(req.body.userId);
  try{
  const user = await User.findOne({userId:req.body.userId});
  console.log(user.watchList)
  const watchMovie = movies.filter(movie => (user.watchList).includes(movie.imdbId));
  console.log(watchMovie)
  res.status(201).json(watchMovie);
  }
  catch(err){
    console.log("catch error-")
    console.log(err);
    res.status(400).json(err);
  }
}

exports.deleteWatchList = async (req, res) => {
  const {imdbId,userId} = req.body;
  // console.log(_id);
  let user = await User.findOne({userId:userId})
  user.watchList=(user.watchList).filter(r=>r!=imdbId)
  console.log(user);
  try{
    const doc = await User.findOneAndUpdate({userId:userId},user,{new:true})
    console.log(doc);
    res.status(201).json(doc);
    }
    catch(err){
      console.log(err);
      res.status(400).json(err);
    }
};

exports.addWatchList = async(req, res) => {
  const {userId,imdbId} = req.body;

    let user = await User.findOne({userId:userId});
    user.watchList.push(imdbId);
  
    try{
      const doc = await User.findOneAndUpdate({userId:userId},user,{new:true})
      console.log(doc);
      res.status(201).json(doc);
      }
      catch(err){
        console.log(err); 
        res.status(400).json(err);
      }
};


exports.createMovie = (req, res) => {
  const movie = new Movie(req.body);
  movie.save((err,doc)=>{
    console.log({err,doc})
    if(err){
      res.status(400).json(err);
    } else{
      res.status(201).json(doc);
    }
  })
};

exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  console.log(movies);
  res.json(movies);
};

exports.getMovie = async (req, res) => {
  const id = req.params.id;
  console.log({id})
  const movie = await Movie.findOne(
    {imdbId:id });
  res.json(movie);
};
exports.replaceMovie = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Movie.findOneAndReplace({imdbId:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
exports.updateMovie = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Movie.findOneAndUpdate({imdbId:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
exports.deleteMovie = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Movie.findOneAndDelete({imdbId:id})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};