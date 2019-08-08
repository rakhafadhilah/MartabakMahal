var express = require('express');
var router = express.Router();
var tools = require('../tools');
var database = require('../database');


// fitur utama

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


// fitur uji coba

// add user
router.get('/debug/au/:username/:password', function (req, res) {
    database.add_user(req.params.username, req.params.password);
    res.send(database.get_user(req.params.username));
});

// get user
router.get('/debug/gu/:username', function (req, res) {
    var user = database.get_user(req.params.username);
    res.send(user);
});

// get all user
router.get('/debug/gau/', function (req, res) {
    res.send(database.get_users());
});

// add food
router.get('/debug/af/:name/:price/:milk', function (req, res) {
    database.add_food(req.params.name, req.params.price, req.params.milk === 'true');
    res.send(database.get_food_by_name(req.params.name));
});

// get food by id
router.get('/debug/gfi/:id', function (req, res) {
    var food = database.get_food(req.params.id);
    res.send(food);
});

// get food by name
router.get('/debug/gfn/:name', function (req, res) {
    var food = database.get_food_by_name(req.params.name);
    res.send(food);
});

// get all food
router.get('/debug/gaf/', function (req, res) {
    res.send(database.get_foods());
});


// laman utama

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
