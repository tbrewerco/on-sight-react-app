//////
// dependencies/imports
//////
const router = require("express").Router();
const Route = require("../models/route.model");
const _ = require("lodash");
const faker = require("faker");

//////
// routes index route
//////

router.get("/", async (req, res) => {
    try {
        let routes = await Route.find({});
        // future (keep within this loop): boulder routes
        routes = routes.map(route => {
            // map over routes
            const grades = route.user_ticks.map(tick => {
                // map over embedded user_ticks, return difficulty_grades
                return tick.difficulty_grade;
            });
            // set consensus grade to mean average of aggregate difficulty_grades from user_ticks, OR uses setter grade if no consensus
            route.consensus_grade = _.round(_.mean(grades)) || route.setter_grade;

            return route;
        });

        res.json(routes);
    } catch (error) {
        res.status(400).json(error);
    };
});

//////
// routes delete route
//////
router.delete("/:id", async (req, res) => {
    try {
        res.json(await Route.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

//////
// routes update route
//////
router.patch("/:id", async (req, res) => {
    try {
        res.json(
            await Route.findByIdAndUpdate(req.params.id, req.body,
            )
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

//////
// routes create route
//////
router.post("/", async (req, res) => {
    try {
        let gymRoute = await Route.create(req.body);
        res.json(gymRoute);
    } catch (error) {
        res.send("Error!", error);
    }
});

module.exports = router;