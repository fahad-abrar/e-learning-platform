import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    const connection = await mongoose
      .connect(process.env.MONGODB_URL, {
        dbName: "online_school",
      })
      .then(console.log("database is connected"));
    return connection;
  } catch (err) {
    console.log("error is occured while connecting database", err);
  }
};
export default databaseConnection;
