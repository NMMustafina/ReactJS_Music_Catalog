const express = require('express');
const User = require('../models/User');
const Track_history = require("../models/TrackHistory");

const router = express.Router();

router.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present!'});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    const {track} = req.body;

    if (!track) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const trackHistoryData = {
        user: user._id,
        track,
        datetime: new Date()
    };

    try {
        const trackHistory = new Track_history(trackHistoryData);
        await trackHistory.save();

        res.send(trackHistory);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;