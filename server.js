'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const secret = 'RAHASIA';

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json()); 
app.set('view engine', 'ejs');

// options

var options = {
    timeout: '5m' // waktu sebelum terpaksa logout
};

// routing

app.get('/login', function (req, res) {
    res.render('login', {});
});

app.get('/pagepertama', function (req, res) {
    res.render('pagepertama', {});
});

app.get('/pagekedua', function (req, res) {
    res.render('pagekedua', {});
});

app.get('/pageketiga', function (req, res) {
    res.render('pageketiga', {});
});

app.get('/test', function (req, res) {
    res.render('test', {});
});

app.get('/', function (req, res) {
    var token = req.cookies.data;

    try {
        var data = jwt.verify(token, secret);
    } catch (err) {
        res.redirect('/login');
        return;
    }

    res.redirect('/pagekedua');
});

// post handling

app.post('/post_login', function (req, res) {

    // tambahin pengecekan username & password disini

    // kalo semuanya valid, perbarui cookie login:
    var payload = {
        username: req.body.username
    };
    var data = jwt.sign(payload, secret, { expiresIn: options.timeout });
    res.cookie('data', data);
    res.redirect('../');
});

// listen

app.listen(port, () => console.log(`Aplikasi POS 'Martabak Mahal' telah dijalankan pada port ${port}!`));