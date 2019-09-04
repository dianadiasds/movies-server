const Sequelize = require('sequelize');
const db = require('../db');
const Comment = require('../comment/model');

const User = db.define('user', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
);
User.hasMany(Comment);
Comment.belongsTo(User);
module.exports = User;
