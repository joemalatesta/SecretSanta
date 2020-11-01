const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()

const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.use(express.static('public'))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

mongoose.set('useCreateIndex', true)
mongoose.connect(mongodbURI, {
 useFindAndModify: false,
 useNewUrlParser: true,
 useUnifiedTopology: true })//).then(() => {
  console.log('Database 2 of 2', mongodbURI)
 // .catch(err => console.log(err))
//})

const partiesController = require('./controllers/parties.js')
app.use('/parties', partiesController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)


app.get('/', (req, res) => {
  res.render('home.ejs', { currentUser: req.session.currentUser })
})

app.listen(PORT, ()=> {
	console.log("Database 1 of 2")
})
