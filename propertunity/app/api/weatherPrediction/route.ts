import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getWeatherData(zipCode: string): Promise<any | null> {
    try {
        const weatherApiKey = process.env.WEATHER_API_KEY;
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${weatherApiKey}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

export default async function propertyRecommendations(req: any, res: any): Promise<void> {
    const { zipCode, buildingDescription } = req.body;

    const weatherData = await getWeatherData(zipCode);
    if (!weatherData) {
        res.status(500).json({ resp: "Error retrieving weather data." });
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const aiprompt = `Provide recommendations for a property owner based on the following details. Weather data: temperature is ${weatherData.main.temp}K, weather condition is "${weatherData.weather[0].description}". The building is described as: "${buildingDescription}". Suggest maintenance tips, enhancements, or protective measures. Make them concise, ensure you account for factors such as rapid temperature changes over time.`;

    const result = await model.generateContent(aiprompt);
    const recommendations = result.response.text();

    res.status(200).json({ resp: recommendations });
}
