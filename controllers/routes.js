// dependencies
const router = require("express").Router();
const Route = require("../models/route.model");

// route index route
router.get("/", async (req, res) => {
    try { 
        res.json(await Route.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// route delete route
router.delete("/:id", async (req, res) => {
    try {
        res.json(await Route.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// route update route
router.patch("/:id", async (req, res) => {
    try {
        res.json(
            await Route.findByIdAndUpdate(req.params.id, req.body, /*{ new: true} */)
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

// route create route
router.post("/", async (req, res) => {
    try {
        res.json(await Route.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router;