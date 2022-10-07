const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    image: String,
    isPublished: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

AlbumSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;