🚀 PROJECT-0003BLOG

Create Stories, Share Ideas, Inspire Minds

A scalable, secure, and modular Blog Application built with Node.js, Express.js, MongoDB, and EJS.

📖 Overview

PROJECT-0003BLOG is a full-stack blogging platform designed for developers and content creators who want secure authentication, smooth content creation, and server-side rendered views.
It provides a clean architecture with user management and blog handling, making it ideal for learning or production-ready deployments.

🌐 Live Project:
👉 https://project-0003blog.onrender.com

🔥 Why PROJECT-0003BLOG?

This project simplifies user authentication and blog management within a clean, scalable backend architecture.

Core Highlights:

🛡️ Authentication
Secure user signup, login, and logout using cookies and JWT.

✍️ Blog Creation & Viewing
Users can create blog posts and view all published blogs.

🧱 Modular Architecture
Built using Express.js with a clear separation of routes, services, models, and views.

🎨 Server-Side Rendering
Uses EJS templates for fast and SEO-friendly rendering.

📁 File Handling
Supports static assets and file uploads via Multer.

🌐 User Interface

Signup Page

Login Page

Create Blog Page

Blog Listing Page

Blog Detail View

Simple, clean, and developer-friendly UI using EJS.

🛠️ Built With
🧰 Tech Stack

Backend

Node.js

Express.js

Frontend

EJS

HTML

CSS

JavaScript

Database

MongoDB

Mongoose

Authentication & Utilities

JSON Web Tokens (JWT)

cookie-parser

dotenv

multer

Deployment

Render

📂 Project Structure
.
├── middlewares/
├── models/
├── public/
├── routes/
├── services/
├── views/
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md

⚙️ Environment Variables

Create a .env file in the root directory and add:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


🔒 .env is excluded from version control for security.

📦 Installation

To build and run the project locally:

1️⃣ Clone the Repository
git clone https://github.com/mangalam-srv/PROJECT-0003BLOG

2️⃣ Navigate to Project Directory
cd PROJECT-0003BLOG

3️⃣ Install Dependencies
npm install

▶️ Usage

To start the project:

npm start


For development (with auto-restart):

npm run dev

🔐 Authentication Flow

User registers or logs in

JWT token is generated

Token is stored in cookies

Protected routes are accessed via middleware validation

📊 Features Summary

✅ User Signup & Login

✅ Secure Authentication

✅ Blog Creation

✅ View Blogs

✅ MVC Folder Structure

✅ Render Deployment

📌 Future Enhancements

✏️ Edit & Delete Blogs

💬 Comments System

❤️ Like / Bookmark Blogs

👤 User Profile Page

📱 Fully Responsive UI

👨‍💻 Author

Mangalam Srivastava

GitHub: https://github.com/mangalam-srv

📄 License

This project is licensed under the ISC License.
