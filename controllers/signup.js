// imports
const signupRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

signupRouter.post('/', async(request, response) => {
    const { username, name, password } = request.body
    
    // validate password - not handled in DB Schema
    const specialChars = /[\W_]/
    if(!password || password.length < 6 || !specialChars.test(password)){
        throw new Error('ValidationError: Password must be greater than 6 characters. Must include special characters')
    } 
    try {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)
            const userToRegister = new User({
                username: username,
                name: name,
                passwordHash: passwordHash
            })
            const savedUser = await userToRegister.save()
            response.status(201).json(savedUser)
    } catch (error) {
        console.error(`ERROR : ${error.message}\n`);
    }
})

module.exports = signupRouter