const express = require('express');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./dataBase/MySQL').getInstance();

dotenv.config({ path: path.join(process.cwd(), '../.env') });

db.setModels();

const { MONGO_DB, PORT } = require('./config/config');
const { apiRouter } = require('./router');

const app = express();

__connectToDB();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            code: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(PORT, () => console.log('Ready'));

function __connectToDB() {
    mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    const { connection } = mongoose;
    connection.on('error', (err) => console.log(err));
}
