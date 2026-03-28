const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const path = require("path");
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
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Welcome to Wanderlust Home Page");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

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
