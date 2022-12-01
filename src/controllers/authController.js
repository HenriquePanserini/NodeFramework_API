const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const User = require('../models/user.js');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 80000,
    });
}

router.post('/register', async (req, res) => {
    const {email} = req.body;
    try{
        if(await User.findOne({email})){
            return res.send(400).send({error: 'User already exist!' });
        }
            const user = await User.create(req.body);
            return  res.send({User});
    }catch(err){
        return err.status(400).send({error: 'Registration failed!'});
    }
})

router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body;
    const user =  User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({error: 'User not found'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error});
    
    user.password = undefined;
    const token = jwt.sign({id: user.id}, authConfig.secret, {
        expiresIn: 80000,
    });

    res.send({
        user,
        token: generateToken});
});

module.exports = app => app.use('/auth', router);
