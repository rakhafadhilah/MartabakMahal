'use strict';
const express = require('express');
const bp = require('body-parser');
const app = express();
const port = 80;

app.use(express.static('public'));
app.use(express.urlencoded()); //parse url-encoded body
app.use(express.json()); //parse .json body (hati2 lupa ini)

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/post_login', function (req, res) {
    res.send(req.body);
    console.log(req.body);
});

app.listen(port, () => console.log(`Aplikasi Martabak Mahal listening on port ${port}!`));