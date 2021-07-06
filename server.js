// dependencies
require('dotenv').config();
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require('express');
const Mongoose = require('mongoose');
const app = express();

// establish database connection
Mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
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