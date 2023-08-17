const router = require("express").Router()
const Student = require("./../models/Student.model")
const students = require("../students.json")
const getQuery = require("./../utils/index")

router.get("/", async (req, res, next) => {
    try {
        const allStudents = await Student.find().populate("cohort")
        res.json(allStudents)
    } catch {
        next({
            message: "Failed to get all students",
        })
    }
})

router.post("/", (req, res, next) => {
    Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        linkedinUrl: req.body.linkedinUrl,
        languages: req.body.languages,
        program: req.body.program,
        background: req.body.background,
        image: req.body.image,
        cohort: req.body.cohort,
        projects: req.body.projects,
    })
        .then(createdStudent => {
            res.status(201).json(createdStudent)
        })
        .catch(() => {
            next({
                message: "Failed to create a student",
            })
        })
})

router.get("/cohort/:cohortId", async (req, res, next) => {
    const { cohortId } = req.query
    const query = getQuery(cohortId)
    try {
        const allStudents = await Student.find(query)
        res.json(allStudents)
    } catch {
        next({
            message: "Failed to get a cohort",
        })
    }
})

router.get("/:studentId", (req, res, next) => {
    const studentId = req.params.studentId

    Student.findById(studentId)
        .populate("cohort")
        .then(oneStudent => {
            console.log("tried to populate", oneStudent)
            res.status(200).json(oneStudent)
        })
        .catch(() => {
            next({
                message: "Failed to get a student",
            })
        })
})

router.put("/:studentId", (req, res, next) => {
    const studentId = req.params.studentId
    Student.findByIdAndUpdate(studentId, req.body, { new: true })
        .then(updatedStudent => {
            res.status(200).json(updatedStudent)
        })
        .catch(() => {
            next({
                message: "Failed to update a student",
            })
        })
})

router.delete("/:studentId", (req, res, next) => {
    const studentId = req.params.studentId
    Student.findByIdAndDelete(studentId)
        .then(() => {
            res.status(200).send()
        })
        .catch(() => {
            next({
                message: "Failed to delete a student",
            })
        })
})

module.exports = router
