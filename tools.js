const express = require('express');
const jwt = require('jsonwebtoken');

const secret = 'RAHASIA';
var options = {
    timeout: '5m' // waktu sebelum terpaksa logout
};

exports.check_cookie = function (token) {
    try {
        var data = jwt.verify(token, secret);
    } catch (err) {
        return false;
    }
    return data;
}

exports.sign_cookie = function (payload) {
    return jwt.sign(payload, secret, { expiresIn: options.timeout });
}