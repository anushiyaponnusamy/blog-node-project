const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});
tagSchema.index({ name: 1 }, { collation: { locale: 'en', strength: 2 } })
module.exports = mongoose.model('Tag', tagSchema);