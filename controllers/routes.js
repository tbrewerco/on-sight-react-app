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
        routes = routes.map(route => {
            const grades = route.user_ticks.map(tick => {
                return tick.difficulty_grade;
            });
            // combine setter_grade value with grades array and produce average of all numbers in the new array.
            route.consensus_grade = _.round(_.mean(grades.concat(route.setter_grade))) || route.setter_grade;

            const ratings = route.user_ticks.map(tick => {
                return tick.quality_rating;
            });

            route.consensus_rating = _.round(_.mean(ratings)) || "Not enough ratings for consensus";

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