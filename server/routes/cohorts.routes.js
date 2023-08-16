const router = require("express").Router()
const Cohort = require("./../models/Cohort.model")

router.get("/", async (req, res, next) => {
    try {
        const allCohorts = await Cohort.find()
        res.json(allCohorts)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
