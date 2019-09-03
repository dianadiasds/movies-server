const express = require('express');
const {Router} = express;
const bcrypt = require('bcrypt');
const User = require('./model');

const userRouter = new Router();
userRouter.post('/user', async (request, response, next) => {
    if (request.body.name) {
        const existUser = await User.findOne({
            raw: true,
            where: {
                name: request.body.name
            }
        });
        if (existUser) {
            return response.status(400).json('User already exists');
        }
    }
    User
        .create({
            name: request.body.name,
            password: bcrypt.hashSync(request.body.password, 10)
        })
        .then(user => {
            response.send(user)
        })
        .catch(next)
});
userRouter.get('/users', (request, response, next) =>
    User
        .findAll()
        .then(user => {
            response.json(user)
        })
        .catch(next)
);
userRouter.get('/users/:id', (request, response, next) =>
    User
        .findByPk(request.params.id, {include: [Event]})
        .then(user => {
            response.json(user)
        })
        .catch(next)
);
module.exports = userRouter;
