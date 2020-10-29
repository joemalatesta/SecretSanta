const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  add2List: Boolean,
})

const User = mongoose.model('User', userSchema)

module.exports = User
