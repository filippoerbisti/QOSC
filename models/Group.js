import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    picture: String,
    name: { type: String, required: true },
    notes: String,
    partecipants: Array
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;