const express = require('express')
const {saveChat} = require('../controllers/chat.controller')
const router = express.Router()

router.post('/startChat', saveChat)

module.exports = router