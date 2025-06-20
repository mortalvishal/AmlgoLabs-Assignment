import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/PersonalFinance`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
export default connectDB;
