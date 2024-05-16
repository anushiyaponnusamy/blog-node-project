const express = require('express');
const controller = require('./controller');
const uploadMiddleware = require('../utils/uploadImage');

const router = express.Router();

router.post('/createPost', uploadMiddleware, (req, res, next) =>
    controller
        .createPost(req)
        .then((data) => res.status(201).send({ data, message: "new post created successfully", status: 201 }))
        .catch((err) => next(err))
);


router.get('/getAllPosts', (req, res, next) =>
    controller
        .getAllPosts(req)
        .then((data) => res.status(200).send({ data, message: "posts retrieved based on filters , sort and pagination", status: 200 }))
        .catch((err) => next(err))
);

module.exports = router;