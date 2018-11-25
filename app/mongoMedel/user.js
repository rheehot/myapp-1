
const mongoose = require('mongoose');
// const config = require('../../config');

const { Schema } = mongoose;

const Users = new Schema({
  email: String,
  password: String,
  nickName: String,
  isDelete: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});
module.exports = mongoose.model('Users', Users);
