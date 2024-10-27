// Route Info:
// - PUT: /api/changeStatus/:TICKET_ID
// - The ticket ID is passed in the URL, you can get it from /getTickets
// - Repsonse is JSON
// - Increases the progress of a ticket by 1
// - If the ticket is at progress 1, it is moved to the Closed collection of tickets

import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export default async function completeTicket(req, res) {
  const {
    query: { id },
  } = req;

  await client.connect();
  const database = client.db("Tickets");
  const openCollection = database.collection("Open");
  const closedCollection = database.collection("Closed");

  const ticket = await openCollection.findOne({ _id: new ObjectId(id) });
  if (!ticket) {
    return res
      .status(404)
      .json({ message: "Ticket not found in Open collection" });
  }

  let newProgress = ticket.progress === 2 ? 1 : ticket.progress + 1;

  if (newProgress === 2) {
    await openCollection.deleteOne({ _id: new ObjectId(id) });

    await closedCollection.insertOne({
      ...ticket,
      progress: newProgress,
    });

    res
      .status(200)
      .json({
        message: "Ticket moved to Closed collection",
        progress: newProgress,
      });
  } else {
    await openCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { progress: newProgress } }
    );

    res
      .status(200)
      .json({ message: "Ticket progress updated", progress: newProgress });
  }
}
