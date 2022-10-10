const express = require('express');
const tourController = require('./../controllers/tourController');

// Creating a sub app
const router = express.Router();

// Param middleware
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  // Chaining multiple middleware functions
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
