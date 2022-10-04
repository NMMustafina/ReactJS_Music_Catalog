const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Track = require("../models/Track");

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

router.get('/', async (req, res) => {
    const query = {};

    if (req.query.artist) {
        query.artist = req.query.artist;
    }

    try {
        let albumsData = await Album
            .find(query)
            .sort({"year": 1})

        const artist = await Artist.findOne({_id: req.query.artist}, "name");

        const albums =[]

        for (let a of albumsData) {
            const tracks = await Track.find({album: a._id});
            albums.push({
                _id: a._id,
                title: a.title,
                artist: a.artist,
                year: a.year,
                image: a.image,
                trackQty: tracks.length
            })
        }

        const artistAlbums = {
            artist: artist.name,
            albums: albums
        };

        res.send(artistAlbums);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const album = await Album
            .findById(req.params.id)
            .populate('artist', 'name info');

        if (!album) {
            res.status(404).send({message: 'Album not found!'});
        }

        res.send(album);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const {title, artist, year} = req.body;

    if (!title || !artist || !year) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const albumData = {
        title,
        artist,
        year,
        image: null,
    };

    if (req.file) {
        albumData.image = 'uploads/' + req.file.filename;
    }

    try {
        const album = new Album(albumData);
        await album.save();

        res.send(album);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;