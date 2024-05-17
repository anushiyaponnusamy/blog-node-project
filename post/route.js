const express = require('express');
const controller = require('./controller');
const uploadMiddleware = require('../utils/uploadImage');
const ErrorUtils = require('../utils/errorUtils');
const ResponseFormatter = require('../utils/responseFormatter');

const router = express.Router();

router.post('/createPost',
    uploadMiddleware,
    async (req, res, next) => {

        try {

            const { message, data, status, error } = await controller.createPost(req);


            if (error) {
                const { error, status } = ErrorUtils.mapError(err);
                return ResponseFormatter.formatResponse(res, error, status);
            } else {
                return ResponseFormatter.formatResponse(res, message, 201, data);
            }
        }
        catch (err) {

            const { error, status } = ErrorUtils.mapError(err);
            return ResponseFormatter.formatResponse(res, error, status);
        }
    }
);


router.get('/getAllPosts',
    async (req, res, next) => {

        try {

            const { message, data, status, error } = await controller.getAllPosts(req);


            if (error) {
                const { error, status } = ErrorUtils.mapError(err);
                return ResponseFormatter.formatResponse(res, error, status);
            } else {
                return ResponseFormatter.formatResponse(res, message, status, data);
            }
        }
        catch (err) {

            const { error, status } = ErrorUtils.mapError(err);
            return ResponseFormatter.formatResponse(res, error, status);
        }
    }
);

module.exports = router;