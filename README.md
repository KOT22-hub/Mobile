📚 Bookstore App
A mobile Book Recommendation app built with React Native and Expo, powered by an Express backend and MongoDB database. Users can sign up, log in, and create book recommendations. Hosted on Railway for a smoother backend deployment experience.
🚀 Features
📖 Create and view book recommendations
🔐 User authentication (Sign up & Log in)
☁️ Backend API with Express
🗄️ MongoDB database for storing books and users
🛠️ Hosted on Railway for easy deployment
🛠 Tech Stack
Tech	Description
React Native + Expo	Frontend mobile framework
Express.js	Backend REST API
MongoDB	NoSQL database
Railway	Hosting backend + database
🚧 Work in Progress
 Fixing issues with the create book endpoint
 Adding UI feedback (loading states, errors)
 Improve validation on forms
 Deploy frontend (if applicable)
💡 Dev Notes
Initially tried Render for backend but switched to Railway due to long cold starts. Railway made deployment smoother and faster.
Faced some challenges with the POST /books endpoint, still debugging and improving API error handling.
📦 Installation
Node.js
Expo CLI (npm install -g expo-cli)
MongoDB (local or hosted)
Railway account (for backend hosting)
Clone and Run Locally
git clone https://github.com/KOT22-hub/Mobile.git
cd bookstore-app
npm install
expo start
Backend (Express API)
In the /server directory:
npm install
npm run dev
Make sure to set your MongoDB URI and other secrets in .env:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
📬 API Endpoints
Method	Endpoint	Description
POST	/auth/signup	Create a new user
POST	/auth/login	Log in and receive token
GET	/books	Get all book recommendations
POST	/books	Create a new recommendation (in progress)
📣 Contributions
This is a solo project for learning and portfolio-building, but feel free to fork or suggest improvements!
🧠 Lessons Learned
Learned the full stack cycle of a mobile app — from UI to backend
Understood hosting limitations and chose better platforms
Got deeper into JWT authentication and MongoDB schema modeling
📌 TODO (Next Up)
 Add update/delete book features
 Implement better UI/UX
 Push app to Play Store / TestFlight


