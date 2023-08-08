import express from "express";
import dbConnect from "./dbConnection.js";
import { router as studentRoutes } from "./student/student.route.js";

const app = express();
// to make app understand json
// api which uses JSON are called Restful APIs
app.use(express.json());

// db connection
dbConnect();

// register route
app.use(studentRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`App is listening in port ${port}`);
});
