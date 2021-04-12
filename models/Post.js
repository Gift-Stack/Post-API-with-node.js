const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    landlordReview: {
        type: String,
    },
    locationReview: {
        type: String,
    },
    qualityReview: {
        type: String,
    },
    video: {
        type: String,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('post', PostSchema);
