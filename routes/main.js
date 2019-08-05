var express = require('express');
var router = express.Router();
var tools = require('../tools');

router.get('/login', function (req, res) {
    res.render('login', {});    
});

router.get('/pagepertama', function (req, res) {
    res.render('pagepertama', {});
});

router.get('/pagekedua', function (req, res) {
    res.render('pagekedua', {});
});

router.get('/pageketiga', function (req, res) {
    res.render('pageketiga', {});
});

router.get('/test', function (req, res) {
    res.render('test', {});
});

router.get('/', function (req, res) {
    var token = req.cookies.data;
    var data = tools.check_cookie(token);
    if (data === false) {
        res.redirect('/login');
    } else {
        res.redirect('/pagekedua');
    }
});

module.exports = router;
