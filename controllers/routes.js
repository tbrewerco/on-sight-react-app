// dependencies
const router = require("express").Router();
const Route = require("../models/route.model");
const _ = require("lodash");
const faker = require('faker');

// route index route
router.get("/", async (req, res) => {
    try {
        let routes = await Route.find({}) // keep modifications to routes within this loop
        routes = routes.map(route => { // map over routes
            const grades = route.user_ticks.map(tick => { // map over embedded user_ticks
                return tick.difficulty_grade; // return difficulty grade
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
            await Route.findByIdAndUpdate(req.params.id, req.body,
            )
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
        res.send("THERE WAS AN ERROR!");
    }
});

// populate fake data
router.post("/fake-data", async (req, res) => {
    try {
        let gymRoute = await Route.create({
            name: faker.commerce.productName(),
            route_type: faker.random.arrayElement(["Sport"]),
            gym_area: faker.random.arrayElement(["Back Wall", "Arch", "World Cup Wall", "45 Degree Cave"]),
            hold_color: _.capitalize(faker.commerce.color()),
            image: "",
            setter_name: faker.random.arrayElement(["Melissa Joan Hart", "Lil Wayne", "Bill Murray", "Travis"]),
            setter_grade: faker.datatype.number({ min: 1, max: 30 }),
            consensus_rating: faker.datatype.number({ min: 1, max: 5 }),
            user_ticks: [
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 30 }), // YDS???
                },
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 30 }), // YDS???
                },
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 30 }), // YDS???
                }
            ],
            // createdBy: "",
        });
        res.json(gymRoute);
    } catch (error) {
        //send error
        res.send("ERROR!");
        //res.status(400).json(error);
    }
});



module.exports = router;