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
    image: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: 'false'
    }
});

AlbumSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;