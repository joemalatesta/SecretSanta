const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partySchema = Schema({
  partyIsFor: String,
  dateOfParty: Date,
  guestList: [{
    name: String,
    email: {type: String, unigue:true}
  }]
})

const Party = mongoose.model('Party', partySchema)

module.exports = Party
