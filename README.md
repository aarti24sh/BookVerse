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

```
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
```

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
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root directory and add:

```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the Server

```bash
npm start
```

Visit: [http://localhost:5000](http://localhost:5000)

---

## 📬 API Endpoints (Test with Postman)

### 🔑 Register

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

---

### 🔓 Login

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Returns a JWT token for authentication.

---

### 📘 Create a Book

```http
POST /api/books
```

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "status": "Reading",
  "rating": 4,
  "notes": "Optional notes"
}
```

---

### 📚 Other Endpoints

- `GET /api/books` — List user books
- `PUT /api/books/:id` — Update a book
- `DELETE /api/books/:id` — Delete a book

---

## 🌐 Deployment on Render

1. Push code to GitHub  
2. Create a new **Web Service** on [Render](https://render.com)  
3. Connect the GitHub repository  
4. Add the following environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
5. Set build command:  
   ```bash
   npm install
   ```
6. Set start command:  
   ```bash
   node server.js
   ```
7. Deploy and test your live URL 🎉

---

## 🔐 Security Features

- Helmet for secure HTTP headers
- NoSQL injection & XSS protection
- Hashed passwords with bcrypt
- Auth-protected routes via JWT

---

## 🚧 Future Improvements

- Pagination support
- Book category filtering
- Upload book cover images
- Dark mode toggle 🌙

---

## 🤝 Contributing

Contributions are warmly welcomed! If you'd like to help:

- 💡 Open an issue to suggest a feature or report a bug  
- 🔧 Submit a pull request  
- 🌍 Help translate or improve documentation  

Please follow the existing code style and write clear commit messages.

---

## 🙏 Credits

Created with ❤️ by Aarti Shankar

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).