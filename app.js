const express = require('express');
const helmet = require('helmet');
const xssSanitize = require('./middleware/xssSanitize');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(xssSanitize);
app.use(cors());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

module.exports = app;