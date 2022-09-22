const express = require('express');
const Track = require("../models/Track");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

const router = express.Router();

router.get('/', async (req, res) => {
    const query = {};
    let tracks;
    try {
        if (req.query.album) {
            query.album = req.query.album;
            const tracksData = await Track
                .find(query)
                .sort({"number": 1})

            const album = await Album.findOne({_id: req.query.album}, "title artist");
            const artist = await Artist.findOne({_id: album.artist}, "name");

            tracks = {
                artist: artist.name,
                album: album.title,
                tracks: tracksData
            };

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
    const {number, title, album, length} = req.body;

    if (!number || !title || !album || !length) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const trackData = {
        number,
        title,
        album,
        length
    };

    try {
        const uniqueNumber = await Track.find({album, number});
        if (uniqueNumber.length > 0) {
            return res.status(409).send({error: 'Track number already exist!'});
        }

        const track = new Track(trackData);
        await track.save();

        res.send(track);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;