import db from "@/utils/db";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await db;
    const database = client.db("contacts");
    const { id } = req.query;
    const { title, content } = req.body;

    const contact = await database.collection("contacts").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    );

    res.json(contact);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};