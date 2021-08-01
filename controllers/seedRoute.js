//////
// dependencies/imports
//////
const router = require("express").Router();
const _ = require("lodash");
const faker = require("faker");

router.get("/seed", async (req, res) => {

    try {
        let gymS = await Gym.create([{
            name: 'Boulder Rock Club',
            address: [{
                streetAddress: '2829 Mapleton Ave',
                city: 'Boulder',
                state: 'CO',
                zip: 80301
            }],
            location: [{
                type: 'Point',
                coordinates: [-105.25678047585386, 40.02687340488846]
            }],
            images: ['https://goo.gl/maps/uUcSZsY8V7PhBuZQA'],
            climbing_routes: [
                {
                    name: faker.commerce.productName(),
                    route_type: faker.random.arrayElement(["Boulder", "Sport"]),
                    gym_area: faker.random.arrayElement(["Roof", "Slab", "Arch", "Big Wall", "Pillar", "45"]),
                    hold_color: _.capitalize(faker.commerce.color()),
                    image: "https://goo.gl/maps/GLhoLbDm2V4XYhLC8",
                    setter_name: faker.random.arrayElement(["Melissa Joan Hart", "Lil Wayne", "Vincent D'Onofrio", "Khloe Kardashian", "Dr. Fauci", "Zach Galifianakis"]),
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
                }
            ],
        },
        ]);
        res.json(gymS);
    } catch (error) {
        res.status('404').send(error);
    }
});