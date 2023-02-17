import db from "@/utils/db";

export default async (req, res) => {
  try {
    const client = await db;
    const database = client.db("contacts");

    const contacts = await database.collection("contacts").find({}).limit(20).toArray();

    res.json(contacts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};