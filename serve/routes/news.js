const express = require('express');
const router = express.Router();
const News = require('../models/news');
const moment = require('moment');

// 获取新闻
router.get('/getNews', async (req, res) => {
    let id = req.param('id');
    if (id) {
        await News.findById(id)
            .then(news => {
                res.send({
                    status: '0',
                    msg: "获取成功",
                    data: news
                });
            })
            .catch(err => {
                res.send({
                    status: '1',
                    msg: "获取失败",
                });
            });

    } else {
        const news = await News.find();
        res.send({
            status: '0',
            msg: "获取成功",
            data: news
        });
    }
});










// 添加新闻
router.post('/addNews', async (req, res) => {
    await News.create({
        title: req.body.title,
        detail: req.body.detail,
        img: req.body.img,
        time: moment().format('YYYY-MM-DD'),
    }).then(news => {
        res.send({
            status: '0',
            msg: '添加成功',
            data: news
        });
    }).catch(err => {
        res.send({
            status: '1',
            msg: '添加失败'
        });
    });
});

// 修改新闻
router.post('/changeNews', async (req, res) => {
    let id = req.body._id;
    const news = await News.findById(id)
        .catch(err => {
            res.send({
                status: 1,
                msg: "新闻不存在",
                data: err
            });
        });
    news.title = req.body.title;
    news.detail = req.body.detail;
    news.img = req.body.img;
    await news.save()
        .then(news => {
            res.send({
                status: 0,
                msg: "修改成功",
                data: news
            })
        })
        .catch(err => {
            res.send({
                status: 1,
                msg: "修改失败",
                data: err
            })
        });
});

// 删除新闻
router.post('/delNews', async (req, res) => {
    let id = req.body.id;
    const news = await News.findById(id)
        .catch(err => {
            res.send({
                status: 1,
                msg: "新闻不存在",
                data: err
            });
        });
    await news.remove()
        .then(news => {
            res.send({
                status: 0,
                msg: "删除成功",
            });
        })
        .catch(err => {
            res.send({
                status: 1,
                msg: "删除失败",
                data: err
            });
        });

});

module.exports = router;
