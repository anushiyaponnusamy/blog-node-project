const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }], createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});
postSchema.index({ tags: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ title: 1, desc: 1 });
module.exports = mongoose.model('Post', postSchema);