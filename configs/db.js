import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectDbAuth = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected...: ${connectDbAuth.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to database...: ${error.message}`);
    process.exit(1);
  }
};
export default connectDb;
