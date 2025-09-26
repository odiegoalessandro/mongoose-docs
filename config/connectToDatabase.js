const mongoose = require("mongoose");

module.exports = async function connectToDatabase() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.7sdbh44.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

  } catch (err) {
    console.error("Error connecting to the database", err);
    process.exit(1);
  }
}