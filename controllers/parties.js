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

router.get('/new', (req, res) => {
	res.render('parties/new.ejs', { currentUser: req.session.currentUser })
})

router.post('/', (req, res) => {
	Party.create(req.body, (error, createdParty) => {
		console.log(req.body)
		console.log('party is created', createdParty)
		res.redirect('/parties')
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



router.get('/:id', isAuthenticated, (req, res) => {
		Party.findById(req.params.id, (err, foundParty) => {
			res.render('parties/show.ejs', {
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


router.put('/:id', isAuthenticated, (req, res) => {
  Party.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
    res.redirect('/parties')
  })
})


router.delete('/:id', isAuthenticated, (req, res) => {
  Party.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/parties')
  })
})


module.exports = router
