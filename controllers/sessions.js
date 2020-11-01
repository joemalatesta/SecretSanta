const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
})


sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err)
      res.send('oops the db had problem')
    } else if (!foundUser){
      res.send('<a href="/parties">Sorry, no user found </a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/parties')
      } else {
        res.send('<a href="/parties"> password does not match </a>')
      }
    }
  })
})

sessions.get('/destroy', (req,res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err)
    } else {
    }
  })
  res.redirect('/parties/login')
})
// sessions.get('/destroy', () => {
//   req.session.destroy(err => {
//
//   })
//   res.redirect('/parties/login')
// })

module.exports = sessions
