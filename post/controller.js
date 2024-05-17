const dbHelper = require('./dbHelper');

const controller = {}
controller.createPost = async (req) => {
    try {
        if (!req.body.title && !req.body.desc && !req.imageUrl && !req.body.tags) return Promise.reject('field required')
        return dbHelper.createPost(req.body.title, req.body.desc, req.imageUrl, req.body.tags);
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}
controller.getAllPosts = async (req) => {
    try {
        const validParams = ['sort', 'page', 'limit', 'keyword', 'tag'];
        const invalidParams = Object.keys(req.query).filter(param => !validParams.includes(param));
        if (invalidParams.length > 0) {
            return res.status(400).json({ error: `Invalid parameter(s): ${invalidParams.join(', ')}` });
        }
        return dbHelper.getAllPosts(req);

    } catch (error) {

        return Promise.reject(error)
    }
}
module.exports = controller;