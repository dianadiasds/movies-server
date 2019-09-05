const express = require('express');
const {Router} = express;
const Movie = require('./model');
const movieRouter = new Router();
const auth = require('../auth/middleware');

movieRouter.get('/movies', (request, response, next) => {
    Movie
        .findAll()
        .then(movie => {
            response.send(movie)
        })
        .catch(next)
});
movieRouter.get('/movies/:id', (request, response, next) =>
    Movie
        .findByPk(request.params.id)
        .then(movie => {
            response.send(movie)
        })
        .catch(next)
);
movieRouter.post('/movie', auth, (request, response, next) => {
    const newMovie = request.body;
    newMovie.userId = request.user.dataValues.id;
    Movie
        .create(newMovie)
        .then(movie => {
            response.json(movie)
        })
        .catch(next);
});

module.exports = movieRouter;
