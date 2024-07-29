const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accessToken: {
      type: String,
    },
    refreshToken: String,
    exppiresIn: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Token", schema);
