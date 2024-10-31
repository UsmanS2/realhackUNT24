# Propertunity

Propertunity is an AI-powered property management solution that helps managers prioritize maintenance tasks, predict future needs, and provide tenants with real-time communication.

## Login Instructions

- **Property Manager Portal:** Use any email ending with `@CBRE.com` and any password to log in.
- **Tenant Portal:** Log in with any email and password.

**Access Propertunity:** [realhack-unt-24.vercel.app](https://realhack-unt-24.vercel.app/)

## Features

- **Dashboard Routing:** Automatic routing to PM/Tenant dashboards.
- **Maintenance Prediction:** Uses ML to forecast maintenance needs.
- **Cost Analysis:** Provides opportunity cost forecasts to help prioritize tasks.
- **Tenant Interface:** Streamlined ticket submission and tracking.
- **AI Chatbot:** Automates ticket creation 24/7 using Gemini AI.
- **Twilio Integration:** Enables tenants to communicate via SMS.

## Tech Stack

- **Frontend:** React with TypeScript
- **Backend:** MongoDB, Next.js, Gemini AI, Twilio API
- **Auth:** Auth0

## Setup Instructions

1. Clone the repo:

   ```bash
   gh repo clone UsmanS2/realhackUNT24
   cd propertunity
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up `next.config.ts`:

   ```bash
   MONGO_URL=your-mongodb-url
   GEMINI_APIKEY=your-gemini-api-key
   TWILIO_ACCOUNT_SID=your-twilio-account-sid
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Future Improvements

- Enhance AI predictions with real-world data.
- Expand system integration for broader support.

---

Built with ❤️ by the Propertunity team.


