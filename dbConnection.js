import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://arun:arun1nly1@school.b6qkdnb.mongodb.net/broadway?retryWrites=true&w=majority"
    );

    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed.");
    console.log(error.message);
  }
};

export default dbConnect;
