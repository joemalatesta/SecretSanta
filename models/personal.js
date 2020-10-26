const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personalSchema = Schema({
  name: String,
  email: String,
  address: String,
  dateOfParty: Date,
  priceLimit: Number,
  giftCards: Boolean,
  favStores: String,
  hobbies: String,
  collections: String,
  favColor: String,
  favSnack: String,
  favFoods: String,
  specialRequests: String,
  registryLinks: String,
  wishList: String,
})

const Personal = mongoose.model('personal', personalSchema)

module.exports = Personal
