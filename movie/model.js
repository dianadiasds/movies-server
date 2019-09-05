const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');
const Comment = require('../comment/model');

const Movie = db.define(
    'movie',
    {
        title: Sequelize.STRING,
        synopsis: Sequelize.TEXT,
        picture: Sequelize.STRING,
        director: Sequelize.STRING,
        yearOfRelease: Sequelize.INTEGER,
    }
);
Movie.belongsTo(User);
Movie.hasMany(Comment);
module.exports = Movie;
