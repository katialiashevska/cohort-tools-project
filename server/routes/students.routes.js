const router = require("express").Router();
const Student = require("./../models/Student.model");
const students = require("../students.json");

router.get("/", async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.log(error);
    app.get("/", (req, res) => {
      res.json(students);
    });
  }
});

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
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create a student" });
    });
});

router.get("/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .populate("cohort")
    .then((oneStudent) => {
      res.status(200).json(oneStudent);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to get a single student" });
    });
});

// router.get("/cohort/cohortId", (req, res) => {
//   const cohortId = req.params.cohortId;

//   Student.find((student) => (student.cohort = cohortId))
//     // collection student
//     .then((oneStudent) => {
//       res.status(200).json(oneStudent);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: "Failed to get a single student" });
//     });
// });

// router.get("/cohort/:cohortId", async (req, res) => {
//   console.log(req.query);
//   // const { cohortId } = req.query;
//   // const query = getQuery(cohortId);
//   try {
//     const allStudents = await Student.find(query);
//     res.json(allStudents);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.put("/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update a single student" });
    });
});

router.delete("/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId)
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete a single student" });
    });
});

module.exports = router;
