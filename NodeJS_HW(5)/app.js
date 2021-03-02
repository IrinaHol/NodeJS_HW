const express = require('express');
const mongoose = require('mongoose');

const { apiRouter } = require('./router');
const { MONGO_DB } = require('./config/config');

const app = express();

__connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(5000, () => console.log('Ready'));

function __connectToDB() {
    mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    const { connection } = mongoose;
    connection.on('error', (err) => console.log(err));
}
