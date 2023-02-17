import db from "@/utils/db";

export default async (req, res) => {
  try {
    const client = await db;
    const database = client.db("contacts");
    const { title, content } = req.body;

    const contact = await database.collection("contacts").insertOne({
      title,
      content,
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};