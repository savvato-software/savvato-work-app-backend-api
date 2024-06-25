require('dotenv').config()

// check .env.example for help to setup .env variables
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const PORT = process.env.PORT

module.exports = { MONGODB_URI, SECRET, PORT }