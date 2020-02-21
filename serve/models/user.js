const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    "userName": {type: String, unique: true},
    "userPwd": {
        type: String,
        set(val){
            return require("bcrypt").hashSync(val,10)
        }
    },
    "money": Number,//用户余额
    "cartList": [
        {
            "goodsName": String,//商品名称
            "img": String,//商品图片
            "sku": {
                "size": String,
                "weight": String,
                "fit": String,
                "price": String
            },//商品sku
            "cartNum": String,//购买数量
        }
    ],
    "addressList": [
        {
            "name":String,//收货人
            "address":String,//收货地址
            "phone":String//联系方式
        }
    ],
    "orderList": [
        {
            "order":String,//订单内容
            "money":String,//订单金额
            "mark":String,//备注
            "status":Number//订单状态 0：未完成 1：已完成 -1：取消
        }
    ]
});

module.exports = mongoose.model('User',UserSchema);
