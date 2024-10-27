import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const uri = process.env.MONGO_URL as string;
const client = new MongoClient(uri);

export default async function completeTicket(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: "Invalid Ticket ID" });
  }

  await client.connect();
  const database = client.db("Tickets");
  const openCollection = database.collection("Open");
  const closedCollection = database.collection("Closed");

  const ticket = await openCollection.findOne({ _id: new ObjectId(id) });
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found in Open collection" });
  }

  const newProgress = ticket.progress === 2 ? 1 : ticket.progress + 1;

  if (newProgress === 2) {
    await openCollection.deleteOne({ _id: new ObjectId(id) });
    await closedCollection.insertOne({
      ...ticket,
      progress: newProgress,
    });

    res.status(200).json({
      message: "Ticket moved to Closed collection",
      progress: newProgress,
    });
  } else {
    await openCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { progress: newProgress } }
    );

    res.status(200).json({ message: "Ticket progress updated", progress: newProgress });
  }
}
