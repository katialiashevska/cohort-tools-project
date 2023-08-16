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

module.exports = router
