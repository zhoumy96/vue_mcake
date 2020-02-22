const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 商品数据模型
const productSchema = new Schema({
    'goodsName':{type: String, unique: true},//商品名称
    'skuList':[
        {
            "size": String,//尺码 如31cm*8cm
            "weight": String,//重量 如1磅(454g)
            "fit": String,//适合2-3人食
            'tablewareNum':Number,//标配餐具
            "price": String//价格
        }
    ],//商品所有sku
    'type':Number,//分类 0:蛋糕 1:小食
    'img':String,//预览图
    'bannerImg':String,//banner图
    'detailImg':String,//详情图
    'time':String,//提前预约时间
    'taste':String,//口感
    'flavor':String,//口味
    'flavorBase':String,//口味基底
    'sweet':Number,//甜味 1-5

    'cartNum':Number,//购物车数量
    'isChecked':Boolean,//是否选中
})

module.exports = mongoose.model('Good',productSchema);
