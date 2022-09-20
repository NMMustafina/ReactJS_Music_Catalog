const express = require('express');
const Track = require("../models/Track");
const Album = require("../models/Album");

const router = express.Router();

router.get('/', async (req, res) => {
    const query = {};
    let tracks;
    try {
        if (req.query.album) {
            query.album = req.query.album;
            tracks = await Track
                .find(query)
                .populate({
                    path: 'album',
                    select: 'title',
                    populate: {path: 'artist', select: 'name'}
                })

        } else if (req.query.artist) {
            const albums = await Album.find({artist: req.query.artist}, "_id title");
            tracks = await Track.find({album: {$in: albums}});

        } else {
            tracks = await Track.find();
        }

        res.send(tracks);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const {title, album, length} = req.body;

    if (!title || !album || !length) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const trackData = {
        title,
        album,
        length
    };

    try {
        const track = new Track(trackData);
        await track.save();

        res.send(track);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;