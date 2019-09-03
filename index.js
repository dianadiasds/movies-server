const express = require('express');
const cors = require('cors');
const middleware = cors();
const app = express();
app.use(middleware);

const bodyParser = require('body-parser');
const parserMiddleware = bodyParser.json();

const userRouter = require('./user/router');
app.use(userRouter);

const port = process.env.PORT || 5000;

const {Router} = express;
const router = new Router();
router.get('/', (request, response) => response.send(`Listening on ${port}`));

app.use(parserMiddleware);
app.use(router);
app.listen(port);
