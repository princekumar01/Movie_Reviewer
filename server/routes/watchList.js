const express = require('express');
const movieController = require('../controller/movie');

const router = express.Router();

router
  .post('/reviews/create', movieController.createReview)
  .post('/reviews/edit', movieController.updateReview)
  .post('/reviews/delete', movieController.deleteReview)
  .post('/get', movieController.getWatchList)
  .post('/add', movieController.addWatchList)
  .post('/delete', movieController.deleteWatchList);
exports.router = router;  