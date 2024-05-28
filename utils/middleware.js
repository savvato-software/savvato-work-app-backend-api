const morgan = require('morgan')
const requestLogger = morgan('dev')

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

module.exports = { requestLogger, unknownEndpoint, errorHandler }