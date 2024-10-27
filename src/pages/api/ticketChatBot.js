// Route Info:
// - POST: /api/ticketChatBot
// - Body should be JSON, {"message": "SOMETHING"}
// - Repsonse is JSON, {"resp": "SOMETHING"}
// - Call the request 1 time first with a blank message, and then continue the convo

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import {MongoClient} from "mongodb";

dotenv.config();

let data = [];
let Stage = '';

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

function cleanAndParseJsonString(input) {
    const cleanedString = input
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/\\n/g, '')
        .replace(/\\"/g, '"');

    let jsonObject;
    try {
        jsonObject = JSON.parse(cleanedString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        jsonObject = {};
    }

    return jsonObject;
}

function getCurrentDateFormatted() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
}

export default async function ticketChatBot(req, res) {

    const { message } = req.body;

    let prompt = ""

    if (Stage === "") {
        prompt = "Please briefly describe the problem you're experiencing.";
        Stage = 'problem';
    } else if (Stage === "problem") {
        data.push(message)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let aiprompt = "Here is some data about an issue a customer is facing. Rephrase everything, make the date into the format DD-MM-YYYY, and return as pure JSON with the keys title (string), description (string), and priority (int 1-3, 1 is low priority, 3 is high), and date (DD-MM-YYYY). Phrase everything as it would be written in an official document. The current date is following, use this for the elevate date the customer inputs: " + getCurrentDateFormatted() + "\n\n" + data.join("\n");
        const result = await model.generateContent(aiprompt);

        let jsonObject = cleanAndParseJsonString(result.response.text())
        data.push(jsonObject)

        prompt = "Just to confirm, is the following accurate?\n\nTicket Title: " + jsonObject.title + "\nTicket Description: " + jsonObject.description + "\nTicket Priority: " + jsonObject.priority + "\nIssue Date: " + jsonObject.date

        Stage = "solutions"
    } else if (Stage === "solutions") {

        if ((message.includes("y")) || (message.includes("Y"))) {
            data.push(message)
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            let aiprompt = "Here is some data about an issue a customer is facing. Write a few suggestions on how to fix it or look into it themselves, make it professional as a property manager would tell a tenant. Don't ask questions, give suggestions on what to do about the issue. Do not mention that you will be calling for help, do not suggesst calling someone else to fix the issue. " + "\n\n" + data.join("\n");
            const result = await model.generateContent(aiprompt);

            prompt = result.response.text() + "\n\nDid any of these solve your problem?"

            Stage = "solution-response"
        } else {
            prompt = "Please briefly describe the problem you're experiencing.";
            Stage = 'problem';
        }
    } else if (Stage === "solution-response") {

        if ((message.includes("y")) || (message.includes("Y"))) {
            Stage = ""
            data = []
            prompt = "Glad you were able to get it resolved!"
        } else {
            prompt = "Submitting the ticket now."
        }

        Stage = "confirmation"
    } else if (Stage === "confirmation") {
        prompt = "Please briefly describe the problem you're experiencing.";
        Stage = 'problem';
        } else {
        if ((message.includes("y")) || (message.includes("Y"))) {
            console.log("push")
            Stage = ""

            const database = client.db('Tickets');
            const closedCollection = database.collection('Open');

            await closedCollection.insertOne({
                title: data[data.length - 1].title,
                message: data[data.length - 1].description,
                assignment: "John",
                danger_level: data[data.length - 1].priority,
                date: getCurrentDateFormatted(),
                issue_date: data[data.length - 1].date,
                progress: 0,
                image: "",
                cost: 0,
                opp_cost: 0
            });

            prompt = "Thank you! Your ticket has been created!"
        }
        data = [];
    }
    res.status(200).json({ resp: prompt })
}
