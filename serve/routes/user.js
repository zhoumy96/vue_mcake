const express = require('express');
const router = express.Router();
const User = require('../models/user');
const SECRET = 'q^FIeDc07Ae14R^m';
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 注册
router.post('/signUp', async (req, res) => {
    await User.create({
        userName: String(req.body.userName),
        userPwd: String(req.body.userPwd),
        money: 0,
        cartList: [],
        addressList: [],
        orderList: [],
    }).then(user => {
        const token = jwt.sign({
            id: String(user._id),
        }, SECRET);
        res.send({
            status: '0',
            msg: '注册成功',
            data: {
                user,
                token
            }
        });
    }).catch(err => {
        res.send({
            status: '1',
            msg: '用户名已经存在'
        });
    });
});

// 登录
router.post('/signIn', async (req, res) => {
    await User.findOne({
        userName: req.body.userName
    }).then(user => {
        if (user) {
            const _pwd = require('bcrypt').compareSync(req.body.userPwd, user.userPwd);
            if (_pwd) {
                const token = jwt.sign({
                    id: String(user._id),
                }, SECRET);
                res.send({
                    status: '0',
                    msg: '登录成功',
                    data: {
                        user,
                        token
                    }
                });
            } else {
                res.send({
                    status: '1',
                    msg: '密码错误'
                });
            }
        } else {
            res.send({
                status: '1',
                msg: '用户不存在'
            });
        }
    }).catch(err => {
        res.send({
            status: '1',
            msg: '请求错误',
            data: err
        });
    })


});

// 登出
router.post('/signOut', (req, res, next) => {

});


// 查询所有用户
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});


// 用户认证中间件
const auth = async (req, res, next) => {
    const raw = String(req.headers.authorization);
    const {id} = jwt.verify(raw, SECRET);
    await User.findById(id)
        .then(user => {
            if (user) {
                // console.log(`用户认证 user is ${user}`);
                req.user = user;
                next();
            } else {
                res.send({
                    status: '1',
                    msg: 'token过期或者不正确',
                });
            }
        })
        .catch(err => {
            res.send({
                status: '1',
                msg: '用户认证错误',
                data: err
            });
        });
};
// 获取用户信息
router.get('/getUser', auth,async (req, res) => {
    res.send(req.user);
});

// 充值
router.post('/recharge', auth, async (req, res) => {
    console.log(`req.user is ${req.user}`);
    console.log(`req.body.money is ${req.body.money}`);
    req.user.money += Number(req.body.money);
    await req.user.save()
        .then(user => {
            res.send({
                status: '0',
                msg: '充值成功',
                data: user.money
            });
        }).catch(err => {
            res.send({
                status: '1',
                msg: '充值失败',
                data: err
            });
        });
    res.send(req.user);
});

// 新增收获地址
router.post('/addAddress', auth, async (req, res) => {
    let address = req.body.address;
    console.log(`address is ${JSON.stringify(address)}`);
    req.user.addressList.push(address);
    await req.user.save()
        .then(user=>{
            res.send({
                status: 0,
                msg: "新增成功",
                data: req.user.addressList
            });
        }).catch(err=>{
            res.send({
                status: 1,
                msg: "新增失败",
            });
        });

});

// 编辑收获地址
router.post('/changeAddress', auth, async (req, res) => {
    let id = req.body.id;
    let address = req.body.address;
    console.log(`req.body is ${JSON.stringify(req.body)}`);
    let isChange = false;
    for(let item of req.user.addressList){
        if (item._id == id) {
            item.name = address.name;
            item.address = address.address;
            item.phone = address.phone;
            isChange = true;
            break;
        }
    };
    if(isChange){
        await req.user.save()
            .then(user=>{
                res.send({
                    status: 0,
                    msg: "修改成功",
                    data: req.user.addressList
                });
            }).catch(err=>{
                res.send({
                    status: 1,
                    msg: "修改失败",
                });
            });
    }else{
        res.send({
            status: 1,
            msg: "地址不存在",
            data: req.user.addressList
        });
    }
});

// 删除收获地址
router.post('/deleteAddress', auth, async (req, res) => {
    let id = req.body.id;
    console.log(id);
    let isDelete = false;
    for(let item of req.user.addressList){
        if (item._id == id) {
            req.user.addressList.remove(item);
            isDelete = true;
            break;
        }
    };
    if(isDelete){
        await req.user.save()
            .then(user=>{
                res.send({
                    status: 0,
                    msg: "删除成功",
                    data: req.user.addressList
                });
            }).catch(err=>{
                console.log(err);
                res.send({
                    status: 1,
                    msg: "删除失败",
                });
            });
    }else{
        res.send({
            status: 1,
            msg: "地址不存在",
            data: req.user.addressList
        });
    }
});

// 添加商品到购物车
router.post('/addToCart', auth, async (req, res) => {
    let goods = req.body.goods;
    let skuId = goods.sku._id;
    goods.sku.id = skuId;
    let isHave = false;
    for(let item of req.user.cartList){
       if(item.sku.id == skuId){
           isHave = true;
           item.cartNum += goods.cartNum;
           break;
       }
    };
    if(!isHave){
        req.user.cartList.push(goods);
    }
    await req.user.save()
        .then(user=>{
            res.send({
                status: 0,
                msg: "添加成功",
                data: req.user.cartList
            });
        }).catch(err=>{
            res.send({
                status: 1,
                msg: "添加失败",
            });
        });

});

// 清空购物车

// 下单生成订单号

// 修改订单状态


module.exports = router;
