
const PostSchema = require('./post_model');
const TagSchema = require('./tag_model');
const dbHelper = {}

dbHelper.createPost = async (title, desc, image, tags) => {
    try {
        let tagIds;
        if (tags)
            tagIds = await Promise.all(tags && Array.isArray(tags) ? tags.map(async tagName => {
                let tag = await TagSchema.findOne({ name: tagName });
                if (!tag) {
                    tag = new TagSchema({ name: tagName });
                    await tag.save();
                }
                return tag._id;
            }) : []);


        const obj = new PostSchema({ title, desc, image, tags: tagIds });
        return await obj.save();
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getAllPosts = async (req) => {
    try {
        const { sort, page, limit, keyword, tag } = req.query;
        const validParams = ['sort', 'page', 'limit', 'keyword', 'tag'];
        const invalidParams = Object.keys(req.query).filter(param => !validParams.includes(param));
        if (invalidParams.length > 0) {
            return res.status(400).json({ error: `Invalid parameter(s): ${invalidParams.join(', ')}` });
        }

        const query = {};
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { desc: { $regex: keyword, $options: 'i' } }
            ];
        }
        if (tag) {
            const tagDoc = await TagSchema.findOne({ name: { $regex: new RegExp(tag, 'i') } }).select('_id');

            if (!tagDoc) {
                throw new Error(`Tag not found with name: ${tag}`);
            }
            query.tags = tagDoc?._id;
        }
        return await PostSchema.find(query)
            .sort(sort || '-createdAt')
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit));


    } catch (error) {

        return Promise.reject(error)
    }
}

module.exports = dbHelper;