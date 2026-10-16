const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
//index.js is inside the init folder, so you need to go one folder up to reach models

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("err");
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); //to delete all the pre-existing data
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6ab8fd299a4abf44ebe5cc36",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialised");
};

initDB();
