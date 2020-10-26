const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partySchema = Schema({
  locOfParty: String,
  dateOfParty: Date,
  guestList: [{
    name: String,
    email: String,
  }]
})

const Party = mongoose.model('Party', partySchema)

module.exports = Party
