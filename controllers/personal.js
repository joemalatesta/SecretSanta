const express = require('express')
const router = express.Router()
const Personal = require('../models/personal.js')


const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}

router.get('/new', (req, res) => {
	res.render('personal/new.ejs', { currentUser: req.session.currentUser })
})

router.post('/', (req, res) => {
	Personal.create(req.body, (error, createdPersonal) => {
		console.log(req.body)
		console.log('About me is created', createdPersonal)
		res.redirect('/personal')
	})
})

router.get('/:id', isAuthenticated, (req, res) => {
		Personal.findById(req.params.id, (err, foundPersonal) => {
			res.render('personal/show.ejs', {
				personal: foundPersonal,
				currentUser: req.session.currentUser
			})
		})
})


router.get('/:id/edit', (req, res) => {
  Personal.findById(req.params.id, (err, foundPersonal) => {
    res.render('personal/edit.ejs', {
      personal: foundPersonal,
			currentUser: req.session.currentUser
    })
  })
})


router.put('/:id', isAuthenticated, (req, res) => {
  Personal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
    res.redirect('/personal')
  })
})


router.delete('/:id', isAuthenticated, (req, res) => {
  Personal.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/personal')
  })
})


module.exports = router
