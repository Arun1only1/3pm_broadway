import { checkMongoIdValidity } from "../utils/utils.js";
import { Student } from "./student.model.js";

// check if student exists
export const checkIfStudentExists = async (req, res, next) => {
  // extract id from params
  const studentId = req.params.id;

  // check validity of studentId
  const isStudentIdValid = checkMongoIdValidity(studentId);

  // if not valid mongo Id, throw error
  if (!isStudentIdValid) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find if user exists
  const student = await Student.findOne({ _id: studentId });

  // if not user, throw error
  if (!student) {
    return res.status(404).send({ message: "Student does not exist." });
  }

  req.studentData = student;

  next();
};

// delete student
export const deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  // delete user
  await Student.deleteOne({ _id: studentId });

  return res
    .status(200)
    .send({ message: "Student has been removed successfully." });
};

// get student details
export const getStudentDetails = (req, res) => {
  const studentData = req.studentData;

  return res.status(200).send(studentData);
};
