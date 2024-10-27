// Route Info:
// - GET: /api/getTickets
// - Repsonse is JSON, {"tickets": [TICKETS]}

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri || "");

export async function GET(request: Request) {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db("Tickets");

    // Fetch Open and Closed tickets
    const openTickets = await database.collection("Open").find({}).toArray();
    const closedTickets = await database
      .collection("Closed")
      .find({})
      .toArray();

    // Combine all tickets
    const allTickets = [...openTickets, ...closedTickets];

    // Return the response as JSON
    return NextResponse.json({
      tickets: allTickets,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    // Return error if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  } finally {
    // Ensure the MongoDB client is closed
    await client.close();
  }
}
