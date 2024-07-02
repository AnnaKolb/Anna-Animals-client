const sequelize = require("../js/sequelize");
const Animal = require("./animals.js");
const { QueryTypes } = require("sequelize");

const DB_NAME = process.env.DB_NAME;

// Check if database exists
sequelize
  .query(`SHOW DATABASES LIKE '${DB_NAME}'`, {
    type: QueryTypes.SELECT,
  })
  .then((databases) => {
    if (databases.length > 0) {
      console.log("Database exists.");
      return;
    } else {
      // Database doesn't exist, create it
      return sequelize.query(`CREATE DATABASE '${DB_NAME}'`).then(() => {
        console.log("Database created.");
      });
    }
  })
  .then(() => {
    // Database exists or created, connect to it and sync tables
    sequelize
      .sync()
      .then(() => {
        console.log("Tables synchronized.");

        const animalsToCreate = [
          {
            name: "Dog",
            description: "A man's best friend.",
            id: 1,
          },
          {
            name: "Cat",
            description: "Independent and curious animals.",
            id: 2,
          },
          {
            name: "Bald Eagle",
            description: "The symbol of America",
            id: 3,
          },
          {
            name: "Snake",
            description: "A reptile that slithers on the ground.",
            id: 4,
          },
          {
            name: "Fish",
            description: "A creature that lives in the water.",
            id: 5,
          },
          {
            name: "Spider",
            description: "An insect that has eight legs and eight eyes.",
            id: 6,
          },
          {
            name: "Ant",
            description:
              "An insect that is very small and can lift 10x its own weight.",
            id: 7,
          },
          {
            name: "Centipede",
            description: "An insect that has 100 legs.",
            id: 8,
          },
          {
            name: "Tiger",
            description: "A large cat that is orange with black stripes.",
            id: 9,
          },
          {
            name: "Human",
            description: "A creature that is the smartest on the planet.",
            id: 10,
          },
        ];

        return Animal.bulkCreate(animalsToCreate, {
          fields: ["name", "description", "id"],
        });
      })
      .then((animals) => {
        console.log(
          "Animals created:",
          animals.map((animal) => animal.toJSON())
        );
      })
      .catch((error) => {
        console.error("Error synchronizing tables:", error);
      });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
