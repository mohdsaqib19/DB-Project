const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw new ExpressError(400, "error");
  } else {
    next();
  }
};

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("./listings/listings.ejs", { listings });
  }),
);

router.get("/new", (req, res) => {
  res.render("./listings/new.ejs");
});

router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body);
    // const { title, description, price, location, country } = req.body;
    // let newListing = new Listing({
    //   title,
    //   description,
    //   price,
    //   location,
    //   country,
    // });
    await newListing.save();
    res.redirect("/listings");
  }),
);

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let result = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  }),
);

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
  }),
);

router.put(
  "/:id",
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
    res.redirect(`/listings/${id}`);
  }),
);

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs", { listing });
  }),
);

module.exports = router;
