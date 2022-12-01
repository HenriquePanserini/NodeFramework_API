const express = require('express');
const authMiddle = require('../middlewares/auth.js')

const router = express.Router();

router.use(authMiddle);

router.get('/', (req, res) => {
    res.send({ ok: true, user: req.userId});
});

module.exports = app => app.use('/projects', router);

