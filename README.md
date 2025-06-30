# 📚 BookVerse

A simple full-stack web application to manage your personal book collection. Users can register, log in, and perform CRUD operations on their books. Each user's data is isolated and securely stored using JWT-based authentication.

---

## 🚀 Features

- ✅ User Registration & Login (with JWT authentication)
- 🔐 Secure Password Hashing (using bcrypt)
- ✏️ Add, Edit, Delete Books
- 🔍 Search & Sort Books by Title, Author, Status, or Rating
- 💬 Modal-based UI for Add/Edit Forms
- 🧰 Client-side & Server-side Validation
- 🧱 MongoDB with Mongoose ORM
- 🛡 Secure HTTP Headers via Helmet
- ☁️ Deployed on Render

---

## 🗂 Project Structure

<details>
<summary>Click to expand</summary>

bookverse/
├── controllers/
│ ├── authController.js
│ └── bookController.js
├── middleware/
│ ├── authMiddleware.js
│ └── errorHandler.js
├── models/
│ ├── User.js
│ └── Book.js
├── public/
│ ├── css/
│ │ └── styles.css
│ ├── js/
│ │ └── main.js
│ ├── index.html
│ └── books.html
├── routes/
│ ├── authRoutes.js
│ └── bookRoutes.js
├── utils/
│ └── connectDB.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

yaml
Copy
Edit

</details>

---

## 🛠 Technologies Used

- **Node.js**
- **Express**
- **MongoDB Atlas** + **Mongoose**
- **JWT Authentication**
- **HTML**, **CSS**, **Vanilla JavaScript**
- **Render** (Deployment)

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bookverse.git
cd bookverse
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Environment Variables
Create a .env file in the root directory and add:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Start the Server
bash
Copy
Edit
npm start
Visit: http://localhost:5000

📬 API Endpoints (Test with Postman)
🔑 Register
http
Copy
Edit
POST /api/auth/register
json
Copy
Edit
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
🔓 Login
http
Copy
Edit
POST /api/auth/login
json
Copy
Edit
{
  "email": "test@example.com",
  "password": "password123"
}
Returns a JWT token for authentication.

📘 Create a Book
http
Copy
Edit
POST /api/books
Authorization: Bearer <token>
json
Copy
Edit
{
  "title": "Book Title",
  "author": "Author Name",
  "status": "Reading",
  "rating": 4,
  "notes": "Optional notes"
}
📚 Other Endpoints
GET /api/books — List user books

PUT /api/books/:id — Update a book

DELETE /api/books/:id — Delete a book

🌐 Deployment on Render
Push code to GitHub

Create a new Web Service on Render

Connect GitHub repository

Add the following environment variables:

MONGO_URI

JWT_SECRET

Set build command: npm install

Set start command: node server.js

Deploy and test your live URL 🎉

🔐 Security Features
helmet for secure HTTP headers

NoSQL injection & XSS protection

Hashed passwords with bcrypt

Auth-protected routes via JWT

🚧 Future Improvements
Pagination support

Book category filtering

Upload book cover images

Dark mode toggle 🌙

🤝 Contributing
Contributions are warmly welcomed! If you'd like to help:

💡 Open an issue to suggest a feature or report a bug

🔧 Submit a pull request

🌍 Help translate or improve documentation

Please follow the existing code style and write clear commit messages.

🙏 Credits
Created with ❤️ by Aarti Shankar

📄 License
This project is licensed under the MIT License.