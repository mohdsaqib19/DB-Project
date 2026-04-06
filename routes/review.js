const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isloggedIn, isOwner, validateReview } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//reviews and comments routes
router.post("/", isloggedIn, wrapAsync(reviewController.createReview));

//delete review
router.delete(
  "/:reviewId",
  isloggedIn,
  isOwner,
  wrapAsync(reviewController.deleteReview),
);
module.exports = router;
