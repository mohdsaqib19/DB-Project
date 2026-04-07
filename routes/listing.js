const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage });
router
  .route("/")
  .get(wrapAsync(listingController.index))
  // .post(isloggedIn, validateListing, upload.single("image"), wrapAsync(listingController.newListing));
  .post((req, res)=>{
    res.send(req.body);
  })
// New Form
router.get("/new", isloggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .delete(isloggedIn, isOwner, wrapAsync(listingController.deleteRoute))
  .put(isloggedIn, isOwner, wrapAsync(listingController.updateRoute))
  .get(wrapAsync(listingController.showListings));

// Edit Route
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.editRoute),
);

module.exports = router;
