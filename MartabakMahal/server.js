'use strict';
const express = require('express');
const bp = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/hehe', function (req, res) {
    res.send(req.body);
    console.log(req.body);
});

app.listen(port, () => console.log(`Aplikasi Martabak Mahal listening on port ${port}!`));