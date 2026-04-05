const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// Show all listings
router.get("/", wrapAsync(listingController.index));

// New Form
router.get("/new", isloggedIn, listingController.renderNewForm);

// Show
router.post("/", isloggedIn, wrapAsync(listingController.newListing));

// Delete Listings
router.delete(
  "/:id",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.deleteRoute),
);

// Edit Route
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.editRoute),
);

// Update Route
router.put(
  "/:id",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.updateRoute),
);

// Show Route
router.get("/:id", wrapAsync(listingController.showListings));

module.exports = router;
