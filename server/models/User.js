const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    password: String,
    completedMeetings: Number,
    rate: Number,
    sex: { type: String, enum: ["male", "female"] },
    profession: { type: Schema.Types.ObjectId, ref: "Profession" },
    qualities: [{ type: Schema.Types.ObjectId, ref: "Quality" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
