const express = require('express');
const authRoutes = require('./routes/auth');
const passport = require('./middleware/passport');

const app = express();

app.use(express.json());

app.use(passport.initialize());

app.use('/api/auth', authRoutes);

module.exports = app;

