const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partySchema = Schema({
  locOfParty: String,
  dateOfParty: Date,
  guestList: [{
    name: String,
    email: String,
  }],
  giftCards: Boolean,
  favStores: String,
  hobbies: String,
  collections: String,
  favColor: String,
  favSnack: String,
  favFoods: String,
  wishList: String,
})

const Party = mongoose.model('Party', partySchema)

module.exports = Party
