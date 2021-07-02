// dependencies
require('dotenv').config();
const { PORT = 4000 } = process.env;
const express = require('express');
const app = express();

// routes
app.get('/', (req, res) => {
    res.send('hello, world');
});

// listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))