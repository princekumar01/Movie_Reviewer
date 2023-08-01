const express = require('express');
const movieController = require('../controller/movie');

const router = express.Router();

router
  .post('/movies', movieController.createMovie)
  .get('/movies', movieController.getAllMovies)
  .get('/movies/:id', movieController.getMovie)
  .put('/movies/:id', movieController.replaceMovie)
  .patch('/movies/:id', movieController.updateMovie)
  .delete('/movies/:id', movieController.deleteMovie);

exports.router = router;  