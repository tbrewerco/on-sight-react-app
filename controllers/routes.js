// dependencies
const router = require("express").Router();
const Route = require("../models/route.model");
const _ = require("lodash");
const faker = require('faker');

// route index route
router.get("/", async (req, res) => {
    try {
        let routes = await Route.find({}) // keep modifications to routes within this loop
        routes = routes.map(route => {
            const grades = route.user_ticks.map(tick => {
                return tick.difficulty_grade;
                // console.log tick
            })
            route.consensus_grade = _.round(_.mean(grades)) || route.setter_grade; // provides mean of grades, rounded, uses setter grade if no consensus
            // console.log(grades);
            return route;
        })
        res.json(routes);
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
        let gymRoute = await Route.create(req.body);
        res.json(gymRoute);
    } catch (error) {
        //send error
        res.send("THERE WAS AN ERROR!");
        //res.status(400).json(error);
    }
});

// fake data
router.post("/fake-data", async (req, res) => {
    try {
        let gymRoute = await Route.create({
            name: faker.commerce.productName(),
            route_type: faker.random.arrayElement(["boulder", "sport"]),
            gym_area: faker.random.arrayElement(["front", "back"]),
            hold_color: faker.commerce.color(),
            image: "",
            setter_name: faker.random.arrayElement(["Scott", "Dave", "Joe"]),
            setter_grade: faker.datatype.number({ min: 1, max: 10 }),
            consensus_rating: faker.datatype.number({ min: 1, max: 5 }),
            user_ticks: [
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 10 }), // YDS???
                },
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 10 }), // YDS???
                },
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 10 }), // YDS???
                }
            ],
            // createdBy: "",
        });
        res.json(gymRoute);
    } catch (error) {
        //send error
        res.send("THERE WAS AN ERROR!");
        //res.status(400).json(error);
    }
});



module.exports = router;