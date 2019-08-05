'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //parse url-encoded body
app.use(express.static('public'));
app.use(express.json()); //parse .json body (hati2 lupa ini)

app.set('view engine', 'ejs');

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

// halaman utama
app.get('/', function (req, res) {
    if (req.cookies.isLoggedIn === 'yes') {
        res.redirect('/pagekedua');
    } else {
        res.redirect('/login');
    }
});

// penerima request post untuk login
app.post('/post_login', function (req, res) {
    if (req.body.username === 'bob' && req.body.password === 'bob') {
        res.cookie('isLoggedIn', 'yes');
    } else {
        res.cookie('isLoggedIn', 'no');
    }
    res.redirect('../');
});

app.listen(port, () => console.log(`Aplikasi POS 'Martabak Mahal' telah dijalankan pada port ${port}!`));