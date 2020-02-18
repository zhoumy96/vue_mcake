const express = require('express');
const router = express.Router();
const Goods = require('../models/goods');
const User = require('../models/user');



// 获取商品列表
router.get('/getGoods', async (req, res) => {
    let type = parseFloat(req.param('type'));
    let params = {
        type:{
            $eq:type
        }
    };
    await Goods.find(params)
        .then(goods=>{
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
router.post('/goodsDetail',(req,res,next)=>{
    let goodsId = req.param('goodsId');
    let params = {
        goodsId:{
            $eq:goodsId
        }
    };
    let goodsModel = Goods.find(params);
    goodsModel.exec(function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'success',
                data:doc[0]
            })
        }
    });
});

// 添加商品到购物车
router.post('/addCart',function (req,res,next) {
    let userId = '100001';
    let goodsId = req.body.goodsId;//商品id
    let sku = req.body.sku;//商品sku
    let num = req.body.cartNum;//商品数量

    User.findOne({userId:userId},function (UserErr,UserDoc) {
        if(UserErr){
            res.json({
                status:'1',
                msg:UserErr.message
            })
        }else{
            // 找到用户
            if(UserDoc){
                let goodsItem = '';
                UserDoc.cartList.forEach(item=>{
                   //同一物品:相同id 相同sku
                   if(item.goodsId == goodsId && item.sku.skuId == sku.skuId){
                       goodsItem = item;
                       item.cartNum += parseInt(num);
                   }
                });
                if(goodsItem){
                    UserDoc.save(function (err,doc) {
                        if(err){
                            res.json({
                                status:'1',
                                msg:err.message
                            })
                        }else{
                            res.json({
                                status:'0',
                                msg:'success',
                            })
                        }
                    });
                }else{
                    Goods.findOne({goodsId:goodsId},function (GoodsErr,GoodsDoc) {
                        if(GoodsErr){
                            res.json({
                                status:'1',
                                msg:GoodsErr.message
                            })
                        }else{
                            if(GoodsDoc){
                                GoodsDoc.cartNum = parseInt(num);
                                GoodsDoc.sku = sku;
                                GoodsDoc.isChecked = true;
                                UserDoc.cartList.push(GoodsDoc);
                                UserDoc.save(function (err,doc) {
                                    if(err){
                                        res.json({
                                            status:'1',
                                            msg:err.message
                                        })
                                    }else{
                                        res.json({
                                            status:'0',
                                            msg:'success',
                                        })
                                    }
                                });
                            }
                        }
                    })
                }
            }
        }
    });
});




module.exports = router;
