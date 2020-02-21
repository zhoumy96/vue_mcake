const express = require('express');
const router = express.Router();
const Goods = require('../models/goods');


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
    let goods = req.body;
    console.log(goods);
    await Goods.create(goods)
        .then(goods => {
            res.send({
                status: '0',
                msg: '添加成功',
                data: goods
            });
        }).catch(err => {
            res.send({
                status: '1',
                msg: '添加失败',
                data:err
            });
        });
});


// 修改商品
router.post('/changeGoods/:id', async (req, res) => {
    let id = req.params.id;
    let goods = req.body;
    console.log(goods);
    // await Goods.create(goods)
    //     .then(goods => {
    //         res.send({
    //             status: '0',
    //             msg: '添加成功',
    //             data: goods
    //         });
    //     }).catch(err => {
    //         res.send({
    //             status: '1',
    //             msg: '添加失败',
    //             data:err
    //         });
    //     });
});





module.exports = router;
