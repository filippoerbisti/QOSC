import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    picture: String,
    name: { type: String, required: true },
    surname: { type: String, required: true },
    nickname: { type: String, required: true },
    mail: { type: String, required: true },
    phoneNum: { type: String, required: true },
    birthday: { type: String, required: true },
    credit: { type: Number, required: true, default: 0 },
    debit: { type: Number, required: true, default: 0 },
    dateLastContact: { type: String, required: true },
    placeLastContact: { type: String, required: true },
    dateLastSeen: { type: String, required: true },
    placeLastSeen: { type: String, required: true },
    notes: String,
    groupId: { type: Number, default: 0 }
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;