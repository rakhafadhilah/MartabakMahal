'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 80;

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //parse url-encoded body
app.use(express.json()); //parse .json body (hati2 lupa ini)

// halaman utama
app.get('/', function (req, res) {
    if (req.cookies.isLoggedIn === 'yes') {
        res.redirect('/pagekedua.html');
    } else {
        res.redirect('/login.html');
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