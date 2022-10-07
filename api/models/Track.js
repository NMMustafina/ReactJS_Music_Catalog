const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    number: {
        type: Number,
        required: true,
        min: 1
    },
    title: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    length: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

TrackSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;