// Route Info:
// - GET: /api/getTickets
// - Repsonse is JSON, {"tickets": [TICKETS]}

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri || "");

export async function GET(request: Request) {
  try {
    await client.connect();
    const database = client.db("Tickets");

    const openTickets = await database.collection("Open").find({}).toArray();
    const closedTickets = await database
      .collection("Closed")
      .find({})
      .toArray();

    const allTickets = [...openTickets, ...closedTickets];

    return NextResponse.json({
      tickets: allTickets,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
