const express = require('express');
const Track = require("../models/Track");
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', auth, permit('admin', 'user'), async (req, res) => {
    try {

        const query = {};
        let tracks;

        if (req.query.album) {
            query.album = req.query.album;
            const tracksData = await Track
                .find(query)
                .sort({"number": 1})

            const album = await Album.findOne({_id: req.query.album}, "title artist");
            const artist = await Artist.findOne({_id: album.artist}, "title");

            tracks = {
                artist: artist.title,
                album: album.title,
                tracks: tracksData
            };

        } else if (req.query.artist) {
            const albums = await Album.find({artist: req.query.artist}, "_id title");
            tracks = await Track.find({album: {$in: albums}});

        } else {
            tracks = await Track.find();
        }

        if (req.user.role === 'user') {
            tracks.tracks = tracks.tracks.filter(t => {
                return t.isPublished || t.user === req.user._id
            })
        }

        res.send(tracks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            return res.status(404).send({message: 'Track not found!'});
        }

        track.isPublished = true;
        await track.save();

        res.send(track);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', auth, permit('admin', 'user'), async (req, res) => {
    try {
        const {number, title, album, length} = req.body;

        const trackData = {
            number,
            title,
            album,
            length,
            user: req.user._id
        };

        const uniqueNumber = await Track.find({album, number});
        if (uniqueNumber.length > 0) {
            return res.status(409).send({error: 'Track number already exist!'});
        }

        const track = new Track(trackData);
        await track.save();

        res.send(track);
    } catch (e) {

        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const artist = await Track.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({message: 'Track not found!'});
        }

        await Track.deleteOne(artist);

        return res.status(200).send({message: 'Success'});
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;