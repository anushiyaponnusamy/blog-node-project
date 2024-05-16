const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const postRoutes = require('./post/route');
const connectToMongoDb = require('./utils/mongoDbConnection');
const uploadMiddleware = require('./utils/uploadImage');
const app = express();

app.use(bodyParser.json());

connectToMongoDb();



app.get("/", (req, res, next) => res.status(200).json({ root: "ok" }));

app.post('/uploadImage', uploadMiddleware, (req, res) => {
    const imageUrl = req.imageUrl;

    res.send(imageUrl)
});
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
