//////
// dependencies/imports
//////
const router = require("express").Router();
const Route = require("../models/route.model");
const _ = require("lodash");
const faker = require("faker");

//////
// routes seed route
//////
router.post("/fake-data-boulder", async (req, res) => {
    try {
        let gymRoute = await Route.create({
            name: faker.commerce.productName(),
            route_type: faker.random.arrayElement(["Boulder"]),
            gym_area: faker.random.arrayElement(["45 Degree", "Slab", "Pillar", "30 Degree"]),
            hold_color: _.capitalize(faker.commerce.color()),
            image: "",
            setter_name: faker.random.arrayElement(["Melissa Joan Hart", "Lil Wayne", "Bill Murray", "Travis"]),
            setter_grade: faker.datatype.number({ min: 1, max: 20 }),
            consensus_rating: faker.datatype.number({ min: 1, max: 5 }),
            user_ticks: [
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 20 }),
                },
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 20 }),
                },
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 20 }),
                }
            ],
        });
        res.json(gymRoute);
    } catch (error) {
        res.send("ERROR!", error);
    }
});

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
                    difficulty_grade: faker.datatype.number({ min: 1, max: 30 }),
                },
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 30 }),
                },
                {
                    comment: faker.lorem.sentence(),
                    quality_rating: faker.datatype.number({ min: 1, max: 5 }),
                    difficulty_grade: faker.datatype.number({ min: 1, max: 30 }),
                }
            ],
        });
        res.json(gymRoute);
    } catch (error) {
        res.send("ERROR!", error);
    }
});

module.exports = router;