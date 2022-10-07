const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const config = require('../config');
const Artist = require("../models/Artist");

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
        let artists;

        if (req.user.role === 'admin') {
            artists = await Artist.find();
        }

        if (req.user.role === 'user') {
            artists = await Artist.find({$or: [{isPublished: true}, {user: req.user._id}]});
        }

        res.send(artists);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({message: 'Artist not found!'});
        }

        artist.isPublished = true;
        await artist.save();

        res.send(artist);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', auth, permit('admin', 'user'), upload.single('image'), async (req, res) => {
    try {
        const {title, info} = req.body;

        const artistData = {
            title,
            info: info || null,
            image: null,
            user: req.user._id
        };

        if (req.file) {
            artistData.image = 'uploads/' + req.file.filename;
        }

        const artist = new Artist(artistData);
        await artist.save();

        res.send(artist);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({message: 'Artist not found!'});
        }

        await Artist.deleteOne(artist);

        return res.status(200).send({message: 'Success'});
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;