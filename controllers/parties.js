const express = require('express')
const router = express.Router()
const Party = require('../models/parties.js')


const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}


const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
 service: 'gmail',
	auth: {
		user: 'thatguyfromcodingcamp',
		pass: 'codecamp'
	}
});


router.get('/new', (req, res) => {
	res.render('parties/new.ejs', { currentUser: req.session.currentUser })
})


router.post('/', (req, res) => {
	Party.create(req.body, (error, createdParty) => {
		if (error) {
			console.log(error)
		} else {
			console.log(req.body)
			console.log('party is created', createdParty)
			res.redirect('/parties')
	 		}
		})
})


router.get('/', (req, res)=>{
    Party.find({}, (error, allParties)=>{
        res.render('parties/index.ejs', {
            parties: allParties,
						currentUser: req.session.currentUser
        })
    })
})

router.get('/:id/sendEmail', (req,res)=>{
	Party.findById(req.params.id, (err, email)=>{
		res.render('parties/sendEmail.ejs', {
			party: email,
			currentUser: req.session.currentUser,
		})
	})
})

router.put('/:id/sendEmail', (req,res)=>{
	Party.findById(req.params.id, (err, email)=>{
		const mailOptions = {
			from: 'thatguyfromcodingcamp@gmail.com',
			to: email,
			subject: "You're Invited to a Secret Santa Party",
			html: '<h1>SHHHH It is Secret Santa Time!</h1><p> please log into the site and fill out your information.</p>'
		}

		transporter.sendMail(mailOptions, function (err, info) {
		if(err)
		console.log(err)
		else
		console.log(info);
		})
		console.log('mail sent')
		res.redirect('/parties')
	})
})

router.get('/:id', isAuthenticated, (req, res) => {
		Party.findById(req.params.id, (err, foundParty) => {
			res.render('parties/show.ejs', {
				party: foundParty,
				currentUser: req.session.currentUser
			})
		})
})


router.get('/:id/addGuests', (req, res) => {
  Party.findById(req.params.id, (err, foundParty) => {
    res.render('parties/addGuests.ejs', {
      party: foundParty,
			currentUser: req.session.currentUser
    })
  })
})


router.get('/:id/edit', (req, res) => {
  Party.findById(req.params.id, (err, foundParty) => {
    res.render('parties/edit.ejs', {
      party: foundParty,
			currentUser: req.session.currentUser
    })
  })
})

router.get('/:id/editAboutMe', (req, res) => {
  Party.findById(req.params.id, (err, foundParty) => {
    res.render('parties/editAboutMe.ejs', {
      party: foundParty,
			currentUser: req.session.currentUser
    })
  })
})

router.get('/:id/aboutMe', (req, res) => {
  Party.findById(req.params.id, (err, foundMe) => {
		console.log(foundMe)
    res.render('parties/aboutMe.ejs', {
      party: foundMe,
			currentUser: req.session.currentUser
    })
  })
})

router.put('/:id', isAuthenticated, (req, res) => {
  Party.findByIdAndUpdate(req.params.id, req.body, req.params.id.guestList, (err, foundModel) => {
		// console.log("1" + err)
		// console.log("2" + req.params.id)
		// console.log("3" + foundModel)
		// console.log(req.body)
		// foundModel.guestList.push(req.body)
		foundModel.save(      (err, savedModel) => {
			res.redirect('/parties')
		})
  })
})

router.delete('/:id', isAuthenticated, (req, res) => {
  Party.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/parties')
  })
})




module.exports = router
