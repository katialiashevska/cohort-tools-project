const mongoose = require("mongoose")

mongoose
    .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
    .then(db => console.log(`Connected to Database: "${db.connection.name}"`))
    .catch(err => console.error("Error connecting to MongoDB", err))
