const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');

const Movie = db.define(
    'movie',
    {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        picture: Sequelize.STRING,
        year: Sequelize.INTEGER,
        score: Sequelize.INTEGER,
        whydontwatch: Sequelize.STRING,
    }
);
Movie.belongsTo(User);
module.exports = Movie;
