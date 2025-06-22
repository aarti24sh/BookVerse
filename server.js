// server.js
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
//const xss = require('xss-clean');
const xssSanitize = require('./middleware/xssSanitize');
const cors = require('cors');
//const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./utils/connectDB');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// DB Connection
connectDB();

// App init
const app = express();

app.use(express.json());
// Middleware
app.use(helmet());
//app.use(xss());
app.use(xssSanitize);
//app.use(mongoSanitize({ replaceWith: '_' }));
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Error Handler
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));