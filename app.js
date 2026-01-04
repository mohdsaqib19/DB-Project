const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejs = require("ejs-mate");
const MONGO_URL = "mongodb://localhost:27017/wanderlust";
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejs);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/listings", async (req, res) => {
  const listings = await Listing.find({});
  res.render("./listings/listings.ejs", { listings });
});
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

app.post("/listings", async (req, res) => {
  const { title, description, price, location, country } = req.body;
  let newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
  });
  await newListing.save();
  res.redirect("./listings/listings");
});
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("./listings/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country } = req.body;
  await Listing.findByIdAndUpdate(id, {
    title,
    description,
    price,
    location,
    country,
  });
  res.redirect(`./${id}`);
});
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
});

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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
