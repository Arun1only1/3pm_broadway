import express from "express";
import { checkMongoIdValidity } from "../utils/utils.js";
import { Student } from "./student.model.js";
import {
  checkIfStudentExists,
  deleteStudent,
  getStudentDetails,
} from "./student.service.js";

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

// get user details by id
router.get("/student/details/:id", checkIfStudentExists, getStudentDetails);

// delete a student
router.delete("/student/delete/:id", checkIfStudentExists, deleteStudent);

export { router };
