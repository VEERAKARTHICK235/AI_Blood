## AI_Blood

An AI-powered mobile ecosystem designed to support Thalassemia patients in India by connecting them with blood donors and providing a comprehensive care management platform. This project was developed for the AI for Good Hackathon by Blend360 to support the mission of Blood Warriors.

## ✨ Features
Real-time Donor Matching: A platform for patients to create blood requests and for donors to find and respond to them.

Role-based Views: A tailored user experience for both patients and donors.

Patient Dashboard: Find compatible donors for upcoming transfusions.

Donor Dashboard: View active blood requests and offer to donate.

AI-Powered Core (Conceptual):

DonorMatch AI: A future predictive model to forecast donor availability and proactively nudge potential donors.

Thalassemia Care Companion: A planned AI chatbot to provide patients with 24/7 support, medication reminders, and educational content.

Secure & Scalable: Configuration for sensitive data (API keys, database URLs) is managed securely using environment variables.


## 🛠️ Technology Stack
Category	Technology
Frontend	React Native, Expo, TypeScript
Backend	Python, FastAPI
Database	PostgreSQL (via Supabase)
DevOps	Node.js, Uvicorn, python-dotenv

##  Getting Started
Follow these instructions to set up and run the project locally.

Prerequisites
Node.js (LTS version, e.g., v20.x.x)

Python (version 3.8+)

Expo Go app on your mobile device

1. Backend Setup
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt


## Your backend/.env file should look like this:

# Get this from a cloud provider like Supabase
DATABASE_URL="postgresql://user:password@host:port/dbname"

# Get this from the Google Cloud Platform Console
MAPS_API_KEY="your-secret-api-key"

# Run the backend serve
uvicorn app.main:app --host 0.0.0.0 --reload

2. Frontend Setup
In a new, separate terminal, set up and run the React Native mobile app.

cd frontend
npm install --legacy-peer-deps

# Open `services/api.ts` and change the API_URL constant
# to your computer's local IP address.
# e.g., const API_URL = 'http://192.000.0.00:8000';

## Run the app
npx expo start
## Scan the QR code with the Expo Go app on your phone to open the application.


## 🗺️ Future Roadmap
[ ] Connect the backend to the PostgreSQL database.

[ ] Implement the DonorMatch AI model for predictive matching.

[ ] Develop and integrate the Thalassemia Care Companion chatbot.

[ ] Add user authentication and authorization using JWT.

[ ] Build out the full user profiles and donation history tracking.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
