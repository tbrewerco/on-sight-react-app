// dependencies
const router = require("express").Router();
const User = require("../models/user.model");

// routes/controllers
router.get("/", (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});

// post route

//
module.exports = router;