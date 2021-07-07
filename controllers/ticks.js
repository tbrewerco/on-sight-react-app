// dependencies
const router = require("express").Router();
const UserTick = require("../models/userTick.model");

// ticks index route
router.get("/", async (req, res) => {
    try { 
        res.json(await UserTick.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// ticks delete route
router.delete("/:id", async (req, res) => {
    try {
        res.json(await UserTick.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// ticks update route
router.patch("/:id", async (req, res) => {
    try {
        res.json(
            await UserTick.findByIdAndUpdate(req.params.id, req.body, /*{ new: true} */)
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

// ticks create route
router.post("/", async (req, res) => {
    try {
        res.json(await UserTick.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router;