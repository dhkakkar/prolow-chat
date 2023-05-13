const mysql = require('mysql');
const sqlConfig = require('../config/appConfig.json').sqlConfig
const date = require('date-and-time')
const { v4: uuidv4 } = require('uuid')
const ChatModel = require('../models/chat.model')

const saveChatData = async (reqBody) => {
    if (!reqBody.convId) {
        reqBody.convId = uuidv4();
    }
    try {
        const now  =  new Date();
        const value = date.format(now,'YYYY-MM-DD HH:mm:ss');
        
        const params = {
            "convId" : reqBody.convId,
            "typeOfmsg" : reqBody.typeOfmsg,
            "typeOfChat" : reqBody.typeOfChat,
            "toUser" : reqBody.toUser,
            "formUser" : reqBody.formUser,
            "msg" : reqBody.msg,
            "date" : value,
            "status" : 0,
            "createdAt" : value,
            "modifiedAt" : value,
        }
        // console.log('Vikas Data params',params)
        // return
        const chat = await ChatModel.create(params)
        if(chat){
            const data = {
                    "typeOfmsg" : chat.dataValues.typeOfmsg,
                    "convId" : chat.dataValues.convId,
                    "typeOfChat" : chat.dataValues.typeOfChat,
                    "toUser" : chat.dataValues.toUser,
                    "formUser" : chat.dataValues.formUser,
                    "msg" : chat.dataValues.msg
            }
            
            return data
        }
    } catch (error) {
        throw error
    }
}

module.exports = {saveChatData }