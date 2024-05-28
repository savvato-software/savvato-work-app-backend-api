const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unqiue: true,
        minLength: 5
    },
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    passwordHash: {
        type: String,
        required: true
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash  // conceal password from display
    }
})

module.exports = mongoose.model('User', userSchema)