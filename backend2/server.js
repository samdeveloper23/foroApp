require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const { errorStandard, notFound } = require('./services/errors');
const intro = require('./controllers/intro');
const newUser = require('./controllers/users/newUser');
const loginUser = require('./controllers/users/loginUser');
const authUser = require('./middlewares/authUser');
const userExists = require('./middlewares/userExists');
const newGili = require('./controllers/gili/newGili');


const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.get('/', intro);

app.post('/users/register', newUser);

app.post('/users/login', loginUser);

app.post('/gili', authUser, userExists, newGili);

app.get('/gili', authUser, userExists, getGili); //voy por aqui! queda este enpoint por montar

app.use(errorStandard);

app.use(notFound);

const port = 3000;

app.listen(process.env.PORT || port, () => {
    console.log(`en puerto: ${process.env.PORT}`.america);
});