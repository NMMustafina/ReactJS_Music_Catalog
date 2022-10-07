const express = require('express');
const Track = require("../models/Track");
const TrackHistory = require("../models/TrackHistory");
const auth = require("../middleware/auth");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const tracksData = await TrackHistory
            .find({user: req.user._id})
            .sort({"datetime": -1})

        const trackHistory = []
        for (let item of tracksData) {
            const data = {}
            const track = await Track.findOne({_id: item.track});
            const album = await Album.findOne({_id: track.album});
            const artist = await Artist.findOne({_id: album.artist});
            data.track = track.title;
            data.artist = artist.title;
            data.datetime = item.datetime;
            data._id = item._id;
            trackHistory.push(data);
        }

        res.send(trackHistory);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', auth, async (req, res) => {
    const {track} = req.body;

    if (!track) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const hasTrack = await Track
        .findById(track);

    if (!hasTrack) {
        return res.status(404).send({message: 'Track not found!'});
    }

    const trackHistoryData = {
        user: req.user._id,
        track,
        datetime: new Date()
    };

    try {
        const trackHistory = new TrackHistory(trackHistoryData);
        await trackHistory.save();

        res.send(trackHistory);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;