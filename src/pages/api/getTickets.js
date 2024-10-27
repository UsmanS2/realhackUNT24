// Route Info:
// - GET: /api/getTickets
// - Repsonse is JSON, {"tickets": [TICKETS]}

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export default async function getTickets(req, res) {
    await client.connect();
    const database = client.db('Tickets');

    const openTickets = await database.collection('Open').find({}).toArray();
    const closedTickets = await database.collection('Closed').find({}).toArray();

    const allTickets = [...openTickets, ...closedTickets];

    res.status(200).json({
        tickets: allTickets
    });
}
