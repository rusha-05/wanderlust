const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema; //we define a var named Schema to store mongoose.Schema so we don't have to write it again and again
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://in.images.search.yahoo.com/search/images?p=unsplash+images&fr=mcafee&type=E210IN885G0&imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F87%2Fae%2F83%2F87ae8360cfe56fda3b49e609eb3b7c25.jpg#id=0&iurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F87%2Fae%2F83%2F87ae8360cfe56fda3b49e609eb3b7c25.jpg&action=click ",
      set: (v) =>
        v === ""
          ? "https://in.images.search.yahoo.com/search/images?p=unsplash+images&fr=mcafee&type=E210IN885G0&imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F87%2Fae%2F83%2F87ae8360cfe56fda3b49e609eb3b7c25.jpg#id=0&iurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F87%2Fae%2F83%2F87ae8360cfe56fda3b49e609eb3b7c25.jpg&action=click "
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner:
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;