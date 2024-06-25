// imports
require('dotenv').config()  // to generate token
const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

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
    // expires in 60 minutes
    const token = jwt.sign(
        userToAuthenticate, 
        config.SECRET, {
        expiresIn: 60 * 60    
    })
    
    // use httpOnly cookie to wrap JWT
    response.cookie('auth_token', token, {
        httpOnly: true,
        secure: false, // true if https
        maxAge: 60 * 60 * 1000, // match token expiresIn
        sameSite: 'strict' // based on cross-site request needs
    })

    response
    .status(200)
    .send({ username: registeredUser.username, name: registeredUser.name })
})


// export to app
module.exports = loginRouter
