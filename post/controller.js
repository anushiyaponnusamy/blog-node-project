const dbHelper = require('./dbHelper');

const controller = {}
controller.createPost = async (req) => {
    try {
        if (!req.body.title || !req.body.desc || !req.imageUrl || !req.body.tags) {

            throw new Error("Bad Request: Missing request body");
        }
        return dbHelper.createPost(req.body.title, req.body.desc, req.imageUrl, req.body.tags);
    } catch (error) {
        throw error
    }
}
controller.getAllPosts = async (req) => {
    try {
        const validParams = ['sort', 'page', 'limit', 'keyword', 'tag'];
        const invalidParams = Object.keys(req.query).filter(param => !validParams.includes(param));
        if (invalidParams.length > 0) {
            throw new Error("Invalid parameter");
        }
        return dbHelper.getAllPosts(req);

    } catch (error) {
        throw error
    }
}
module.exports = controller;