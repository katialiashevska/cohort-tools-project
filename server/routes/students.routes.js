const router = require("express").Router()
const Student = require("./../models/Student.model")

router.get("/", async (req, res, next) => {
    try {
        const allStudents = await Student.find()
        res.json(allStudents)
    } catch (error) {
        console.log(error)
    }
})

router.post("/", (req, res) => {
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
            res.status(201).send(createdStudent)
        })
        .catch(error => {
            res.status(500).send({ error: "Failed to create the student" })
        })
})

module.exports = router
