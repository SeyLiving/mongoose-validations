const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 10,
    },
    body: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    author:{
      type: Schema.Types.ObjectId,
      required: true,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = model("Posts", postSchema);
