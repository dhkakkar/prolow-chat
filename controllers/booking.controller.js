const { saveBookingData, } = require('../manager/booking.mannager')
const { successResponse, failureResponse } = require('../services/generateResponse')
const searchBooking = async (req, res) => {
    try {
        console.log('Node Naruto');
        const reqBody = req.body
        
        let result = await saveBookingData(reqBody)
        successResponse(req, res, result, 'New Booking added')
    } catch (error) {
        failureResponse(req, res, error)
    }
}

module.exports = { searchBooking }