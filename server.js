// dependencies
require('dotenv').config();
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require('express');
const app = express();
const Mongoose = require('mongoose');
const Route = require("./models/route");
const UserTick = require("./models/user_tick");

// establish database connection
Mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false // ???
});

// connection events
Mongoose.connection
    .on("open", () => console.log("connected to mongoose")) 
    .on("close", () => console.log("disconnected from mongoose")) 
    .on("error", (error) => console.log(error));
    
// routes
app.get('/', (req, res) => {
    res.send('hello, world');
});

// listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))