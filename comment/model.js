const Sequelize = require('sequelize');
const db = require('../db');

const Comment = db.define(
    'comment',
    {
        comment: Sequelize.STRING,
        score: Sequelize.INTEGER,
    }
);

module.exports = Comment;
