import express from "express";
import { Student } from "./student.model.js";
import {
  checkIfStudentExists,
  deleteStudent,
  getStudentDetails,
} from "./student.service.js";
import mongoose from "mongoose";

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

// edit a student
router.put("/student/edit/:id", async (req, res) => {
  // extract id from params
  const studentId = req.params.id;

  // validate id so that it is valid mongId
  const isValidMongoId = mongoose.Types.ObjectId.isValid(studentId);

  // if not valid,throw error

  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // check if user exists of that id
  const student = await Student.findOne({ _id: studentId });

  // if not user, throw error
  if (!student) {
    return res.status(404).send({ message: "Student does not exist." });
  }

  // edit user with data from req.body
  const newData = req.body;
  await Student.updateOne(
    { _id: studentId },
    {
      name: newData.name,
      age: newData.age,
      gender: newData.gender,
      location: newData.location,
    }
  );
  // send appropriate response
  return res.status(200).send({ message: "Student is updated successfully." });
});

// get all students
router.get("/students", async (req, res) => {
  const allStudents = await Student.find();

  return res.status(200).send(allStudents);
});

export { router };
