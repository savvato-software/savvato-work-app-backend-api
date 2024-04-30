const express = require('express');
const mongoose = require('mongoose');

const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('.env');

const app = express();
const PORT = process.env.PORT || 3000;

getProperty = (pty) => { return prop.get(pty);}

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB Atlas
const dbURI = getProperty('mongo.connect.string');
mongoose.connect(dbURI, { })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('DB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

