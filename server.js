// dependencies
require('dotenv').config();
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require('express');
const app = express();
const Mongoose = require('mongoose');
// const Route = require("./models/route.model");
// const UserTick = require("./models/userTick.model");
const cors = require("cors");
const morgan = require("morgan");

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

// routes (home)
// app.get('/', (req, res) => {
//     res.send('hello, world');
// });

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const ticksRouter = require("./controllers/ticks");
app.use("/ticks", ticksRouter);

// const routesRouter = require("./controllers/routes");
// app.use("/routes", routesRouter);

// const usersRouter = require("./controllers/users");
// app.use("/users", usersRouter);





// listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))