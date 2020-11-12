const router = require('./dreams');
const express = require('express').Router();
const User = require('../models/User');
const {registrationValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (request, response) => {
    const {error} = registrationValidation(request.body);
    if(error) return response.status(400).send(error.details[0].message)

    const emailExists = await User.findOne(({email: request.body.email}))
    
    if(emailExists) return response.status(400).send('Email already exists ')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt)

    const user = new User ({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save()
        response.send({user: user._id});
    }catch (err){
        response.status(400).send(err);
    }
})

router.post('/login', async (request, response) => {
    const {error} = loginValidation(request.body);
    if(error) return response.status(400).send(error.details[0].message)

    const user = await User.findOne(({email: request.body.email}))
    
    if(!user ) return response.status(400).send('EMAIL or password is wrong')

    const validPassword = await bcrypt.compare(request.body.password, user.password )
    if(!validPassword) return response.status(400).send('Email or PASSWORD is wrong')

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET )
    response.header('auth-token', token).send(token )
    response.send('Logged in')
})
module.exports = router;