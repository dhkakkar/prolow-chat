const express = require('express')

const router = express.Router()
router.use('/chat', require('./chatRoute'))

module.exports = router