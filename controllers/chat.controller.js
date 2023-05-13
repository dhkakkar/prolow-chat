const { saveChatData, } = require('../manager/chat.mannager')
const { successResponse, failureResponse } = require('../services/generateResponse')
const saveChat = async (req, res) => {
    try {
        console.log('Node Naruto');
        const reqBody = req.body
        
        let result = await saveChatData(reqBody)
        successResponse(req, res, result, 'New Chat added')
    } catch (error) {
        failureResponse(req, res, error)
    }
}

module.exports = { saveChat }