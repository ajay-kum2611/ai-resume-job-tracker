# AI Resume & Job Tracker

An AI-powered full-stack web application that helps users manage their resumes, track job opportunities, manage applications, and analyze how well their resume matches a job.

## 🚀 Features

- 🔐 User Registration & Login
- 📊 Personalized Dashboard
- 📄 Resume Creation & Management
- 🤖 AI Resume Analysis
- 💼 Job Tracking
- ✏️ Add, Edit & Delete Jobs
- 📋 Application Tracking
- 🎯 AI-powered Job Match Score
- 🧠 Matching & Missing Skills Analysis
- 👤 User Profile
- 📱 Responsive UI
- 🔒 JWT Authentication

## 🤖 AI Features

The application uses Google Gemini AI to provide:

- Resume quality analysis
- Resume strengths and weaknesses
- Improvement suggestions
- Job-resume matching score
- Matching skills
- Missing skills
- Job-specific recommendations

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### AI
- Google Gemini API

## 📁 Project Structure

```text
ai-resume-job-tracker/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
