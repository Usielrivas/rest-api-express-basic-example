import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.DB_URI);
  console.log("DB Ok");
} catch (error) {
  console.error(error);
}
