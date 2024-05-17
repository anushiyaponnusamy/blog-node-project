const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const postRoutes = require('./post/route');
const connectToMongoDb = require('./utils/mongoDbConnection');
connectToMongoDb();
const app = express();

app.use(bodyParser.json());





app.get("/", (req, res, next) => res.status(200).json({ root: "ok" }));

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
