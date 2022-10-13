const express = require('express');
const axios = require("axios");
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const User = require('../models/User');
const config = require('../config');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.post('/', upload.single('avatarImage'), async (req, res) => {
    try {
        const {email, password, displayName} = req.body;

        const userData = {
            email,
            password,
            displayName,
            avatarImage: null
        };

        if (req.file) {
            userData.avatarImage = 'uploads/' + req.file.filename;
        }

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
        const user = await User.findOne({email: req.body.email});

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

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect!'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            user = new User({
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatarImage: req.body.picture.data.url
            });
        }

        user.generateToken();
        await user.save({validateBeforeSave: false});

        return res.send({message: 'Login or register successful', user});

    } catch (e) {
        return res.status(401).send({message: 'Facebook token incorrect'});
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});

module.exports = router;