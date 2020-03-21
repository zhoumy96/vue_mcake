const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express test'});
});

mongoose.set('useCreateIndex', true);
// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/cake', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", function () {
    console.log('MongoDB connected success');
});
mongoose.connection.on("error", function () {
    console.log('MongoDB connected error');
});
mongoose.connection.on("disconnected", function () {
    console.log('MongoDB connected disconnected');
});


module.exports = router;
