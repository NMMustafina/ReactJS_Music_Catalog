const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    info: String,
    image: String,
    isPublished: {
        type: Boolean,
        required: true,
        default: 'false'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

ArtistSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;