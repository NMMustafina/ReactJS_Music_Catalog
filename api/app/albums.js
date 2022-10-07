const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Track = require("../models/Track");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

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

router.get('/', auth, permit('admin', 'user'), async (req, res) => {
    try {
        if (!req.query.artist) {
            return res.status(400).send({error: 'Data not valid'});
        }

        let albumsData = null;
        if (req.user.role === 'admin') {
            albumsData = await Album
                .find({artist: req.query.artist})
                .sort({"year": 1})
        } else if (req.user.role === 'user') {
            albumsData = await Album
                .find({$or: [{artist: req.query.artist, isPublished: true}, {user: req.user._id}]})
                .sort({"year": 1})
        }

        const artist = await Artist.findOne({_id: req.query.artist}, "title");

        const albums = []

        for (let a of albumsData) {
            const tracks = await Track.find({album: a._id});
            albums.push({
                _id: a._id,
                title: a.title,
                artist: a.artist,
                year: a.year,
                image: a.image,
                trackQty: tracks.length,
                isPublished: a.isPublished
            })
        }

        const artistAlbums = {
            artist: artist.title,
            albums: albums
        };

        res.send(artistAlbums);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', auth, permit('admin', 'user'), async (req, res) => {
    try {
        const album = await Album
            .findById(req.params.id)
            .populate('artist', 'title info');

        if (!album) {
            res.status(404).send({message: 'Album not found!'});
        }

        res.send(album);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).send({message: 'Album not found!'});
        }

        album.isPublished = true;
        await album.save();

        res.send(album);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', auth, permit('admin', 'user'), upload.single('image'), async (req, res) => {
    try {
    const {title, artist, year} = req.body;

    const albumData = {
        title,
        artist,
        year,
        image: null,
        user: req.user._id
    };

    if (req.file) {
        albumData.image = 'uploads/' + req.file.filename;
    }

        const album = new Album(albumData);
        await album.save();

        res.send(album);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const artist = await Album.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({message: 'Album not found!'});
        }

        await Album.deleteOne(artist);

        return res.status(200).send({message: 'Success'});
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;