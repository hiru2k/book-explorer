# 📚 Book Management Web Application(කතුවරයා)

This project is a web application for managing a collection of books, allowing users to view, add, edit, and delete books. The application includes user authentication and utilizes JWT (JSON Web Tokens) for secure login and registration. The frontend is built with React, and the backend is implemented using Node.js, Express, and MongoDB. The application is styled using Tailwind CSS, with responsive design principles for a user-friendly experience.

## 🏗️ How to Set Up the Project

Follow these steps to set up and run the project on your local machine.

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/hiru2k/book-explorer.git

```

### **2️⃣ Backend Setup (Node.js, Express, MongoDB)**

install dependencies- yarn install
setup environmenet variables
run - yarn start or npm start

````bash
# Install dependencies
yarn install

# setup environmenet variables
```env
MONGODB_URL=<your_mongodb_connection_string>
ACCESS_TOKEN_SECRET=<your_jwt_access_token_secret>
REFRESH_TOKEN_SECRET=<your_jwt_refresh_token_secret>
PORT=<server_port>
NODE_ENV=<app_running_environment>

# run app
yarn start

````

### **3️⃣ Frontend Setup (React, Redux, Tailwind CSS)**

````bash
# Install  dependencies
yarn install

# setup environmenet variables
```env
VITE_API_BASE_URL=<backend_url>

# run app
yarn dev

````

## 🚀 Features

✅ User authentication (JWT-based registration, login, logout)  
✅ CRUD operations for books (Create, Read, Update, Delete)  
✅ Genre management for books  
✅ Responsive UI with Tailwind CSS  
✅ Global state management using Redux (for users & books) and Context API (for genres)  
✅ Custom hooks & reusable components  
✅ Standard folder structure and modular codebase

---

## 🛠 Tech Stack

### **Frontend:**

- **React** (with Vite for fast builds)
- **Redux Toolkit** (for user & book state management)
- **Context API** (for managing book genres)
- **Tailwind CSS** (for styling)
- **React Router** (for navigation)
- **Custom Hooks & Reusable Components**

### **Backend:**

- **Node.js**
- **Express.js**
- **MongoDB** (using Mongoose for database interaction)
- **JWT (JSON Web Token)** for authentication

## 📂 Database Structure (MongoDB)

```json
{
  "Users": {
    "_id": "ObjectId",
    "name": "String",
    "email": "String",
    "password": "String",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "Books": {
    "_id": "ObjectId",
    "title": "String",
    "author": "ObjectId (Reference to Users)",
    "description": "String",
    "genre": "ObjectId (Reference to Genre)",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "Genres": {
    "_id": "ObjectId",
    "name": "String",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## 🔌 API Endpoints

### **📚 Book Endpoints**

| Method | Endpoint         | Description         | Authentication Required |
| ------ | ---------------- | ------------------- | ----------------------- |
| GET    | `/api/books`     | Fetch all books     | ✅ Yes                  |
| POST   | `/api/books`     | Add a new book      | ✅ Yes                  |
| PUT    | `/api/books/:id` | Update book details | ✅ Yes                  |
| DELETE | `/api/books/:id` | Delete a book       | ✅ Yes                  |

### **📂 Genre Endpoints**

| Method | Endpoint     | Description      | Authentication Required |
| ------ | ------------ | ---------------- | ----------------------- |
| GET    | `/api/genre` | Fetch all genres | ✅ Yes                  |

### **👤 User Authentication Endpoints**

| Method | Endpoint             | Description             | Authentication Required |
| ------ | -------------------- | ----------------------- | ----------------------- |
| POST   | `/api/register`      | Register a new user     | ❌ No                   |
| POST   | `/api/login`         | Login and get JWT token | ❌ No                   |
| GET    | `/api/logout`        | Logout user             | ❌ No                   |
| GET    | `/api/refresh_token` | Refresh JWT token       | ❌ No                   |
| GET    | `/api/infor`         | Get user details        | ✅ Yes                  |
