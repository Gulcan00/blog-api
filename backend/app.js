require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const passport = require('./middleware/passport');
const { authenticate } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/posts', authenticate, require('./routes/posts'));
app.use('/api/comments', authenticate, require('./routes/comments'));

app.use(errorHandler);

module.exports = app;

