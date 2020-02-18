const express = require('express');
const router = express.Router();
const Goods = require('../models/goods');
const User = require('../models/user');


// 获取商品列表
router.get('/getGoods', async (req, res) => {
    let type = parseFloat(req.param('type'));
    let params = {
        type: {
            $eq: type
        }
    };
    await Goods.find(params)
        .then(goods => {
            res.send({
                status: '0',
                msg: "获取成功",
                data: goods
            });
        })
        .catch(err => {
            res.send({
                status: '1',
                msg: "获取失败",
            });
        });

});


// 获取商品详情
router.post('/goodsDetail', async (req, res) => {
    let goodsId = req.body.goodsId;
    await Goods.findById(goodsId)
        .then(goods => {
            res.send({
                status: 0,
                msg: "获取商品详情成功",
                data: goods
            });
        }).catch(err => {
            res.send({
                status: 1,
                msg: "商品不存在",
                data: err
            });
        })
});


// 新增商品
router.post('/addGoods', async (req, res) => {

})


module.exports = router;
