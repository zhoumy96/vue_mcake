const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    "userName": {type: String, unique: true},
    "userPwd": {
        type: String,
        set(val) {
            return require("bcrypt").hashSync(val, 10)
        }
    },
    "money": Number,//用户余额
    "cartList": [
        {
            "goodsId": String,//商品Id
            "goodsName": String,//商品名称
            "img": String,//商品图片
            "sku": {
                "id": String,
                "size": String,//尺码 如31cm*8cm
                "weight": String,//重量 如1磅(454g)
                "fit": String,//适合2-3人食
                'tablewareNum': Number,//标配餐具
                "price": String//价格
            },//商品sku
            "skuList": [
                {
                    "size": String,//尺码 如31cm*8cm
                    "weight": String,//重量 如1磅(454g)
                    "fit": String,//适合2-3人食
                    'tablewareNum': Number,//标配餐具
                    "price": String//价格
                }
            ],//商品所有的sku
            "cartNum": Number,//购买数量
            "isSame": {
                type: Boolean,
                default: false
            },//是否有相同的商品 方便购物车修改是可以快速判断
            "isCheck": {
                type: Boolean,
                default: false
            },//是否在购物车中勾选
        }
    ],
    "addressList": [
        {
            "name": String,//收货人
            "address": String,//收货地址
            "phone": String//联系方式
        }
    ],
    "orderList": [
        {
            "list": Array,//订单内容
            "totalPrice": String,//订单总金额
            "totalNum": Number,//订单总件数
            "mark": String,//备注
            "status": Number,//订单状态 0：未付款 1:已付款未发货 2：已发货 3:订单已完成 -1：用户取消
            "address":{
                "name": String,//收货人
                "address": String,//收货地址
                "phone": String//联系方式
            }
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
