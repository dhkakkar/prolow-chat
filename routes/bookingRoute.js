const express = require('express')
const {searchBooking} = require('../controllers/booking.controller')
const router = express.Router()
const { authentication } = require('../services/auth.service')

router.post('/searchBooking', authentication, searchBooking)

module.exports = router