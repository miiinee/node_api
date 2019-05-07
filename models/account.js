// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
});

// arrow method 사용하면 제대로 작동하지 않음(this binding 오류)
// generates hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
Account.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// export default mongoose.model('account', Account);
module.exports = mongoose.model('account', Account);