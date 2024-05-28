require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const loginRouter = require('./controllers/login')
const signupRouter = require('./controllers/signup')
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Route requests
app.use('/public/login', loginRouter);
app.use('/public/signup', signupRouter);

// Connect to MongoDB Atlas
const mongodb_uri = process.env.MONGODB_URI
mongoose.connect(mongodb_uri, { })
  .then(() => console.log('Database connected'))
  .catch(error => console.log('DB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

