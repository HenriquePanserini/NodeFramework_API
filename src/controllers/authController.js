const express = require('express');

const User = requiere('../models/user.js');

const router = express.Router();

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

module.exports = app => app.use('/auth', router);
