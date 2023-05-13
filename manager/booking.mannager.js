const mysql = require('mysql');
const sqlConfig = require('../config/appConfig.json').sqlConfig
const date = require('date-and-time')
const { v4: uuidv4 } = require('uuid')
const ChatModel = require('../models/booking.model')

const saveBookingData = async (reqBody) => {
    try {
        return 'naruto';
    } catch (error) {
        throw error
    }
}

module.exports = { saveBookingData }