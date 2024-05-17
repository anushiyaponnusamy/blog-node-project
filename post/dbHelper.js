
const PostSchema = require('./post_model');
const TagSchema = require('./tag_model');
const dbHelper = {}

dbHelper.createPost = async (title, desc,
    image,
    tags) => {
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


        const obj = new PostSchema({
            title, desc,
            image,
            tags: tagIds
        });
        return { data: await obj.save(), message: "new post created successfully" }

    } catch (error) {
        throw error
    }
}

dbHelper.getAllPosts = async (req) => {
    try {
        const { sort, page, limit, keyword, tag } = req.query;


        const query = {};
        console.log
            (keyword)
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { desc: { $regex: keyword, $options: 'i' } }
            ];
        }
        if (tag) {
            const tagDoc = await TagSchema.findOne({ name: tag }).collation({ locale: 'en', strength: 2 }).select('_id');

            if (tagDoc) {
                query.tags = tagDoc._id;
            }
        }
        if (!query.tags && !keyword) {
            return {
                data: [], message: "posts retrieved based on filters, sort and pagination"
            }
        }

        const data = await PostSchema.find(query)
            .sort(sort || '-createdAt')
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit));

        return {
            data, message: "posts retrieved based on filters, sort and pagination"
        }
    } catch (error) {

        throw error
    }
}

module.exports = dbHelper;