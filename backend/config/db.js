import mongoose from "mongoose";

const uri = process.env.URI || "mongodb://localhost:27017/job-board";

export default async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected with database");
  } catch (error) {
    console.error(error);
  }
};
