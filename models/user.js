const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

// Source - https://stackoverflow.com/a/79840068
// Posted by Hitech
// Retrieved 2026-09-26, License - CC BY-SA 4.0

const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);