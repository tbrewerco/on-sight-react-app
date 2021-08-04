//////
// dependencies/imports
//////
const router = require("express").Router();
const Gym = require("../models/gym.model");
const _ = require("lodash");
const faker = require("faker");

//////
// routes index route
//////

router.get("/", async (req, res) => {
    try {
        let gyms = await Gym.find({});
        gyms = gyms.map(gym => {
            const climbingRoutes = gym.climbing_routes.map(route => {
                const grades = route.user_ticks.map(tick => {
                    // console.log(tick);
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
            return gym;
        })
        res.json(gyms);
    } catch (error) {
        res.status(400).json(error);
    };
});

//////
// routes delete route
//////
router.delete("/:id", async (req, res) => {
    try {
        res.json(await Gym.findByIdAndRemove(req.params.id));
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
            await Gym.findByIdAndUpdate(req.params.id, req.body,
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
        let gymS = await Gym.create(req.body);
        res.json(gymS);
    } catch (error) {
        res.send("Error!", error);
    }
});

module.exports = router;
