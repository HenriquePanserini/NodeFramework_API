const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        requiere: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
});

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password;
    next();
});

const User = mongoose.model('User',userSchema);
module.exports = User;