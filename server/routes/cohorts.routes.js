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

router.post("/", (req, res) => {
    Cohort.create({
        cohortSlug: req.body.cohortSlug,
        cohortName: req.body.cohortName,
        program: req.body.program,
        format: req.body.format,
        campus: req.body.campus,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        programManager: req.body.programManager,
        leadTeacher: req.body.leadTeacher,
        totalHours: req.body.totalHours,
    })
        .then(createdCohort => {
            res.status(201).json(createdCohort)
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to create a cohort" })
        })
})

module.exports = router
