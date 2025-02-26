require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const bot = require("./telegram/bot.js");

connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
//app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
