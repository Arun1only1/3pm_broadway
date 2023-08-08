import express from "express";
import { Student } from "./student.model.js";

const router = express.Router();

// add student
router.post("/student/add", async (req, res) => {
  try {
    const newStudent = req.body;
    await Student.create(newStudent);
    return res.status(201).send({ message: "Student added successfully." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export { router };
