const express = require('express');
const {Router} = express;
const Comment = require('./model');
const commentRouter = new Router();
const auth = require('../auth/middleware');
const User = require('../user/model')

commentRouter.get('/comments/movies/:movieId', (request, response, next) => {
    Comment
        .findAll({
            raw: true,
            where: {
                movieId: request.params.movieId
            },
            include: [{
                model: User
            }]
        }).then(comment => {
        response.json(comment)
        })
        .catch(next)
});

commentRouter.post('/comments', auth, (request, response, next) => {
    const newComment = request.body
    newComment.userId = request.user.dataValues.id
    Comment
        .create(request.body)
        .then(comment => {
            response.json(comment)
        })
        .catch(next)
});

module.exports = commentRouter;
