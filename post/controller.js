const dbHelper = require('./dbHelper');

const controller = {}
controller.createPost = async (req) => {
    try {
        if (!req.body.title && !req.body.desc && !req.imageUrl && !req.body.tags) return 'field required';
        return dbHelper.createPost(req.body.title, req.body.desc, req.imageUrl, req.body.tags);
    } catch (error) {
        return Promise.reject(error)
    }
}
controller.getAllPosts = async (req) => {
    try {
        return dbHelper.getAllPosts(req);

    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = controller;