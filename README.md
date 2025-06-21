BookVerse

A simple full-stack web application to manage your personal book collection. Users can register, log in, and perform CRUD operations on their books. Each user's data is isolated and securely stored using JWT-based authentication.

🚀 Features

User Registration & Login (with JWT authentication)

Secure Password Hashing (using bcrypt)

Add, Edit, Delete Books

Search & Sort Books by Title, Author, Status, or Rating

Modal-based UI for Add/Edit Forms

Client-side & Server-side Validation

MongoDB with Mongoose ORM

Secure HTTP Headers via Helmet

Deployed on Render

🗂 Project Structure

bookverse/
├── controllers/
│   ├── authController.js
│   └── bookController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   └── Book.js
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── index.html
│   └── books.html
├── routes/
│   ├── authRoutes.js
│   └── bookRoutes.js
├── utils/
│   └── connectDB.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

🛠 Technologies Used

Node.js

Express

MongoDB Atlas + Mongoose

JWT Authentication

HTML, CSS, Vanilla JavaScript

Render (for deployment)

🧪 Getting Started

1. Clone the Repo

git clone https://github.com/your-username/bookverse.git
cd bookverse

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env file at the root with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Start the Server

npm start

Visit: http://localhost:5000

🧪 API Testing with Postman

Register

POST /api/auth/register

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

Login

POST /api/auth/login

{
  "email": "test@example.com",
  "password": "password123"
}

Returns a JWT token to be used in future requests.

Create Book

POST /api/books
Headers:
Authorization: Bearer <token>

Body:

{
  "title": "Book Title",
  "author": "Author Name",
  "status": "Reading",
  "rating": 4,
  "notes": "Optional notes"
}

Other endpoints:

GET /api/books - list user books

PUT /api/books/:id - update a book

DELETE /api/books/:id - delete a book

🌐 Deployment on Render

Push code to GitHub.

Create new Web Service on Render.

Connect to GitHub repo.

Add environment variables in Render Dashboard:

MONGO_URI

JWT_SECRET

Set build command: npm install

Set start command: node server.js

Deploy and test the live URL.

🔐 Security Features

Helmet for setting secure HTTP headers

XSS and NoSQL injection prevention

Passwords hashed with bcrypt

Auth protected routes with JWT


📚 Future Improvements

Pagination for large book lists

Category filtering

Upload book cover images

Dark mode toggle 🌙

🙏 Credits

Created with ❤️ by Aarti Shankar

📄 License

This project is open-source and free to use.