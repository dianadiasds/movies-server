const {Router} = require('express');
const {toJWT} = require('./jwt');
const User = require('../user/model');
const bcrypt = require('bcrypt');

const router = new Router();

router.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
        res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    }
    else {
        User
            .findOne({
                where: {
                    name: req.body.name
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).send({
                        message: 'User with that email does not exist'
                    })
                }

                if (bcrypt.compareSync(req.body.password, entity.password)) {
                    res.send({
                        jwt: toJWT({userId: entity.id})
                    })
                } else {
                    res.status(400).send({
                        message: 'Password was incorrect'
                    })
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({
                    message: 'Something went wrong'
                })
            })
    }
});

module.exports = router;
