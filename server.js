//////
// .env
//////
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;
//////
// dependencies/imports
//////
const express = require("express");
const app = express();
const Mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
// const methodOVerride = require("method-override");

//////
// establish database connection
//////
Mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//////
// connection events
//////
Mongoose.connection
    .on("open", () => console.log("connected to mongoose"))
    .on("close", () => console.log("disconnected from mongoose"))
    .on("error", (error) => console.log(error));

// test route
app.get("/", (req, res) => {
    res.send("hello, world!");
});

//////
// middleware
//////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(methodOverride("_method"));

//////
// routes
//////

const routesRouter = require("./controllers/routes");
app.use("/routes", routesRouter);
const seedRouter = require("./controllers/seed_route");
app.use("/routes", seedRouter);

//////
// listener
//////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));