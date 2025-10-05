const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectdb;
