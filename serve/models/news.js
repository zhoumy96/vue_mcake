const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 新闻数据模型
const NewsSchema = new Schema({
    'title': String,
    'detail': String,
    'img': String,
    'time': String,
});

module.exports = mongoose.model('News', NewsSchema);
