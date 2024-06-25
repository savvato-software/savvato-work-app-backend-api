require('dotenv').config()
const morgan = require('morgan')
const requestLogger = morgan('dev')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'Unknown Endpoint' })
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'ValidationError'){
        response.status(400).send({error: error.message})
    }
    next()
}

// retrieve token from httpOnly cookie
const tokenExtractor = (request, response, next) => {
    request.token = request.cookies['auth_token']
    next()
}

// validate user's JWT and authenticate user access
const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken){
        response.status(401).json({error: 'Invalid Token. User authentication failed.'})
    }
    request.user = await User.findById(decodedToken.id)
    next()
}

// export to app
module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor }