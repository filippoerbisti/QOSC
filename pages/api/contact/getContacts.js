import db from "@/utils/db";

export default async (req, res) => {
  try {
    const client = await db;
    const database = client.db("contacts");

    const contacts = await db.collection("contacts").find({}).limit(20).toArray();

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};