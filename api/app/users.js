const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {username, password} = req.body;
        const userData = {username, password};
        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(401).send({message: 'Credentials are wrong!'});
        }

        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            return res.status(401).send({message: 'Credentials are wrong!'});
        }

        user.generateToken();
        await user.save({validateBeforeSave: false});
        res.send({message: 'Username and password correct!', user});
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;