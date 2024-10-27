import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri || "");

export async function DELETE(request: Request) {
    try {
        await client.connect();
        const database = client.db("Tickets");

        const url = new URL(request.url);
        const { id: ticketId } = await request.json();

        if (!ticketId) {
            return NextResponse.json({ error: "Ticket ID is required" }, { status: 400 });
        }

        const openResult = await database.collection("Open").deleteOne({ _id: new ObjectId(ticketId) });
        const closedResult = await database.collection("Closed").deleteOne({ _id: new ObjectId(ticketId) });

        if (openResult.deletedCount === 0 && closedResult.deletedCount === 0) {
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Ticket deleted successfully" });
    } catch (error) {
        console.error("Error deleting ticket:", error);
        return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 });
    } finally {
        await client.close();
    }
}
