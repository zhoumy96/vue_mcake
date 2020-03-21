const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    "userName": {type: String, unique: true},
    "userPwd": {
        type: String,
        set(val) {
            return require("bcrypt").hashSync(val, 10)
        }
    },
});

module.exports = mongoose.model('Admin', AdminSchema);
