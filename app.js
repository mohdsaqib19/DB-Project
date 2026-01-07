const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejs = require("ejs-mate");
const { error } = require("console");
const MONGO_URL = "mongodb://localhost:27017/wanderlust";
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejs);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw new ExpressError(400, "error");
  } else {
    next();
  }
};
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("./listings/listings.ejs", { listings });
  })
);

app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

app.post(
  "/listings",
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
  })
);

app.delete(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("./");
  })
);

app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
  })
);

app.put(
  "/listings/:id",
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
  })
);

app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", { listing });
  })
);

//listings routes
// app.get('/listings', async (req, res) => {
//     let sampleListing =  new Listing({
//         title: "Beautiful Beach House",
//         desciption: "A lovely beach house with stunning ocean views.",
//         price : 1200,
//         location : "Delhi",
//         country : "India"

//     });
//     sampleListing = await sampleListing.save();
//     const listings = await Listing.find({});
//     res.json(listings);

// });

app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  res.status((statusCode = 500)).render("error.ejs", { message, statusCode });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
