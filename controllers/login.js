// imports
require('dotenv').config()  // to generate token
const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async(request, response) => {
    const { username, password } = request.body
    const registeredUser = await User.findOne({ username: username })
    if(!registeredUser){
        throw new Error('User does not exist. Signup for access.')
    }
    
    const validPassword = password === null 
        ? false 
        : await bcrypt.compare(password, registeredUser.passwordHash)
    if(!validPassword){
        throw new Error('Invalid Password. Provide the associated password to username.')
    }

    // generate jwt for valid user
    const userToAuthenticate = {
        username: registeredUser.username,
        id: registeredUser.id
    }
    // expires in 15 minutes
    const token = jwt.sign(
        userToAuthenticate, 
        process.env.SECRET, {
        expiresIn: 15*60    
    })
    response
    .status(200)
    .send({ token, username: registeredUser.username, name: registeredUser.name })
})


module.exports = loginRouter
