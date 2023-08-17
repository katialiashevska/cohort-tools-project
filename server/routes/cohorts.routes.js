const router = require("express").Router()
const Cohort = require("./../models/Cohort.model")

router.get("/", async (req, res, next) => {
    try {
        const allCohorts = await Cohort.find()
        res.json(allCohorts)
    } catch {
        next({
            message: "Failed to get all cohorts",
        })
    }
})

router.post("/", (req, res, next) => {
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
        .catch(() => {
            next({
                message: "Failed to create a cohort",
            })
        })
})

router.get("/:cohortId", (req, res, next) => {
    const cohortId = req.params.cohortId
    Cohort.findById(cohortId)
        .then(oneCohort => {
            res.status(200).json(oneCohort)
        })
        .catch(() => {
            next({
                message: "Failed to get a cohort",
            })
        })
})

router.put("/:cohortId", (req, res, next) => {
    const cohortId = req.params.cohortId
    Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
        .then(updatedCohort => {
            res.status(200).json(updatedCohort)
        })
        .catch(() => {
            next({
                message: "Failed to update a cohort",
            })
        })
})

router.delete("/:cohortId", (req, res, next) => {
    const cohortId = req.params.cohortId
    Cohort.findByIdAndDelete(cohortId)
        .then(() => {
            res.status(200).send()
        })
        .catch(() => {
            next({
                message: "Failed to delete a cohort",
            })
        })
})

module.exports = router
