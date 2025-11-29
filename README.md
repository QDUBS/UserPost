# Users & Posts API

## 📌 Overview

An API and frontend application that manages Users, their Addresses, and their Posts with full CRUD functionality for posts and pagination for users.
The backend is built with Node.js + Express + TypeScript + SQLite, and the frontend provides a simple interface to interact with the API.

## 🚀 Features

🔹 Backend (Node + TypeScript + SQLite)

- Fetch paginated users

- Fetch single user with formatted address

- Fetch posts for user

- Create a new post

- Delete a post

- SQLite database with migrations & seed data

- Fully tested using Jest + Supertest

- API documentation with Swagger UI

🔹 Frontend

- Displays users

- View a single user’s details

- Displays posts associated with a user

- Create new posts

- Delete posts

## 📦 1. Project Structure

```bash
root/
 ├── backend/
 │    ├── config/
 │    ├── migrations/
 │    ├── scripts/
 │    ├── src/
 │    ├── tests/
 │    └── .env
 │    └── data.db
 │    └── jest.config.js
 │    └── nodemon.json
 │    └── tsconfig.json
 ├── frontend/
 │    ├── public/
 │    ├── src/
 │    ├── styles/
 │    ├── .env
 │    ├── App.tsx
 │    ├── index.html
 │    ├── main.tsx
 │    ├── style.css
 │    ├── tailwind.config.js
 │    ├── style.css
 │   README.md
 └── .gitignore
```


## ⚙️ 2. Backend Setup (Node + TypeScript + SQLite)

### 📥 Prerequisites

- Node.js v18+

- NPM

- SQLite3 installed locally

### 🧰 Install Dependencies
```bash
cd backend
npm install
```

### 🗄️ Run Database Migrations
```bash
npm run migrate
```

### 🧪 Run Backend Tests (Jest)
```bash
npm test
```

To run in watch mode:
```bash
npm run test:watch
```

### ▶️ Start Backend Server (Development)
```bash
npm run dev
```

### 🚀 Start Backend Server (Production)
```bash
npm run build
npm start
```

This compiles TypeScript to /dist and runs the server.

### 📚 Swagger API Documentation

Once backend is running, visit:

```bash
http://localhost:3001/docs
```


## 🖥️ 3. Frontend Setup
### 📥 Install Dependencies
```bash
cd frontend
npm install
```

### ▶️ Run Frontend (Development)
```bash
npm start
```

## 🌐 4. Live URLs
**Services**

- 🚀**Backend**: https://userpost-y1xm.onrender.com

- 🎨**Frontend**: https://user-post-theta.vercel.app/users

- 📚**Swagger Docs**: https://userpost-y1xm.onrender.com/docs

## 🧪 5. Test Instructions
-  **Backend Unit Tests**: Jest

## 📘 6. API Endpoints Overview
### 👤 Users
**Methods**
- **GET** -	`/users?pageNumber=&pageSize=` Paginated users
- **GET** -	`/users/count` Total user count
- **GET** -	`/users/:id` Fetch single user with address

### 📝 Posts
**Methods**
- **GET** - `/posts/user/:id` Get posts for a user
- **POST** - `/posts` Create post {title, body, userId}
- **DELETE** - `/posts/:id`	Delete post


## 📝 7. License

**MIT License © 2025**