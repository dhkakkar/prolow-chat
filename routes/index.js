const express = require('express')

const router = express.Router()
router.use('/chat', require('./chatRoute'))
router.use('/booking', require('./bookingRoute'))

module.exports = router