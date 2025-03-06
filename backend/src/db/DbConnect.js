import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB: -", connection.connection.host);
  } catch (error) {
    console.log("MongoDB connection Failed", error);
  }
};

export default DbConnect;
