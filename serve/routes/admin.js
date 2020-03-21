const express = require('express');
const router = express.Router();
const path = require('path');
const Admin = require('../models/admin');
const News = require('../models/news');

const formidable = require('formidable');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/signUp', async (req, res) => {
    await Admin.create({
        userName: String(req.body.userName),
        userPwd: String(req.body.userPwd),
    }).then(user => {
        res.send({
            status: '0',
            msg: '注册成功',
        });
    }).catch(err => {
        res.send({
            status: '1',
            msg: '用户名已经存在'
        });
    });
});

// 上传图片
router.post('/upload', async (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    // 保留扩展名
    form.keepExtensions = true;
    //文件存储路径 最后要注意加 '/' 否则会被存在public下
    form.uploadDir = path.join(__dirname, '../public/images/');
    // 解析 formData 数据
    form.parse(req, (err, fields ,files) => {
        if(err) return next(err);
        let imgPath = files.file.path;
        let imgName = files.file.name;
        // console.log(`imgName is ${imgName}`);
        // console.log(`imgPath is ${imgPath}`);
        let img = 'http://localhost:3000/public/images/'+imgPath.split('\\').pop();
        // console.log(img);
        // 返回路径和文件名
        res.send({
            status: '1',
            msg: '上传成功',
            data: { name: imgName, path: img }
        });
        // res.json({code: 1, data: { name: imgName, path: imgPath }});
    })
});

// 登录
router.post('/signIn', async (req, res) => {
    await Admin.findOne({
        userName: req.body.userName
    }).then(admin => {
        if (admin) {
            const _pwd = require('bcrypt').compareSync(req.body.userPwd, admin.userPwd);
            if (_pwd) {
                res.send({
                    status: '0',
                    msg: '登录成功',
                    data: {
                        admin,
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




module.exports = router;
