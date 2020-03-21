const express = require('express');
const router = express.Router();
const Goods = require('../models/goods');


// 获取商品列表
router.get('/getGoods', async (req, res) => {
    let type = parseFloat(req.param('type'));
    if(type==-1){
        const goods = await Goods.find();
        res.send({
            status: '0',
            msg: "获取成功",
            data: goods
        });
        return ;
    }
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
                msg: '商品名称已存在',
                data:err
            });
        });
});


// 修改商品
router.post('/changeGoods', async (req, res) => {
    let id = req.body._id;
    let data = req.body;
    console.log(data);
    const goods = await Goods.findById(id)
        .catch(err => {
            res.send({
                status: 1,
                msg: "商品不存在",
                data: err
            });
        });
    console.log(goods);

    goods.goodsName = data.goodsName;
    goods.bannerImg = data.bannerImg;
    goods.detailImg = data.detailImg;
    goods.flavor = data.flavor;
    goods.flavorBase = data.flavorBase;
    goods.img = data.img;
    goods.img = data.img;
    goods.skuList = data.skuList;
    goods.taste = data.taste;
    goods.time = data.time;
    goods.type = data.type;

    await goods.save()
        .then(goods => {
            res.send({
                status: 0,
                msg: "修改成功",
                data: goods
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

// 删除商品
router.post('/delGoods', async (req, res) => {
    let id = req.body.id;
    const goods = await Goods.findById(id)
        .catch(err => {
            res.send({
                status: 1,
                msg: "商品不存在",
                data: err
            });
        });
    await goods.remove()
        .then(goods => {
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
