import { GoogleGenerativeAI } from "@google/generative-ai";
import { MongoClient } from "mongodb";
import twilio from "twilio";
import { NextResponse } from "next/server";

interface TicketData {
    title: string;
    description: string;
    priority: number;
    date: string;
    category: string;
}

let data: (string | TicketData)[] = [];
let Stage: string = "";

const uri = process.env.MONGO_URL || "";
const client = new MongoClient(uri);

const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const twilioClient = twilio(accountSid, authToken);

function cleanAndParseJsonString(input: string): TicketData {
    const cleanedString = input
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/\\n/g, "")
        .replace(/\\"/g, '"');

    let jsonObject: TicketData;
    try {
        jsonObject = JSON.parse(cleanedString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        jsonObject = { title: "", description: "", priority: 1, date: "", category: "" };
    }

    return jsonObject;
}

function getCurrentDateFormatted(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
}

export async function POST(request: Request) {
    try {
        const body = await request.text();
        const params = new URLSearchParams(body);

        const message = (params.get("message") || "").toString();
        const From = params.get("From");
        console.log(message, From)
        let prompt: string = "";

        if (Stage === "") {
            prompt = "Please briefly describe the problem you're experiencing.";
            Stage = "problem";
        } else if (Stage === "problem") {
            data.push(message);
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY || "");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const aiprompt = `Here is some data about an issue a customer is facing. Rephrase everything, make the date into the format DD-MM-YYYY, and return as pure JSON with the keys title (string), description (string), priority (int 0-2, 0 is low priority, 2 is high), date (DD-MM-YYYY), and category (string, it can be plumbing, electrical, carpentry, hvac, appliances, or space optimization, NOTHING ELSE. Phrase everything as it would be written in an official document. The current date is ${getCurrentDateFormatted()}.\n\n${data.join(
                "\n"
            )}`;

            const result = await model.generateContent(aiprompt);
            const jsonObject = cleanAndParseJsonString(await result.response.text());
            data.push(jsonObject);

            prompt = `Just to confirm, is the following accurate?\n\nTicket Title: ${jsonObject.title}\nTicket Description: ${jsonObject.description}\nTicket Priority: ${jsonObject.priority}\nIssue Date: ${jsonObject.date}`;
            Stage = "solutions";
        } else if (Stage === "solutions") {
            if (message.toLowerCase().includes("y")) {
                data.push(message);
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY || "");
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                const aiprompt = `Here is some data about an issue a customer is facing. Write a few suggestions on how to fix it or look into it themselves, make it professional as a property manager would tell a tenant. Don't ask questions, give suggestions on what to do about the issue. Do not mention that you will be calling for help, do not suggest calling someone else to fix the issue.\n\n${data.join(
                    "\n"
                )}`;
                const result = await model.generateContent(aiprompt);

                prompt = `${await result.response.text()}\n\nDid any of these solve your problem?`;
                Stage = "solution-response";
            } else {
                prompt = "Please briefly describe the problem you're experiencing.";
                Stage = "problem";
            }
        } else if (Stage === "solution-response") {
            if (message.toLowerCase().includes("y")) {
                Stage = "";
                data = [];
                prompt = "Glad you were able to get it resolved!";
            } else {
                const database = client.db("Tickets");
                const closedCollection = database.collection("Open");
                console.log(data);
                await closedCollection.insertOne({
                    title: (data[data.length - 2] as TicketData).title,
                    message: (data[data.length - 2] as TicketData).description,
                    assignment: "John",
                    danger_level: (data[data.length - 2] as TicketData).priority,
                    date: getCurrentDateFormatted(),
                    issue_date: (data[data.length - 2] as TicketData).date,
                    progress: 0,
                    image: "",
                    cost: 0,
                    opp_cost: 0,
                    category: (data[data.length - 2] as TicketData).category.toLowerCase(),
                });
                data = [];
                Stage = "";
                prompt = "Thank you! Your ticket has been created!";
            }
        }

        await twilioClient.messages.create({
            body: prompt,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: From || "",
        });

        return NextResponse.json({ status: "Message sent successfully" });
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
