const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("./listings/listings.ejs", { listings });
  }),
);
 
router.get("/new", isloggedIn, (req, res) => {
  res.render("./listings/new.ejs");
});

router.post(
  "/",
  isloggedIn,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing Created");
    res.redirect("/listings");
  }),
);

router.delete(
  "/:id",
  isloggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let result = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  }),
);

// Edit Route
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
  }),
);

// Update Route
router.put(
  "/:id",
  isloggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    // if(!req.body.listing) throw new ExpressError("Invalid Listing Data",400);
    const { title, description, price, location, country } = req.body;
    await Listing.findByIdAndUpdate(id, {
      title,
      description,
      price,
      location,
      country,
    });
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
  }),
);

// Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({path : "reviews" , populate : {path : "author"}})
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      return res.redirect("/listings");
    }
    console.log(listing);

    res.render("./listings/show.ejs", { listing });
  }),
);

module.exports = router;
