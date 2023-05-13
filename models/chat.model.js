const { DataTypes } = require("sequelize");
const { sequelize } = require('../connection')

const ChatSchema = {
    chat_msg_id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        required: true
    },
    formUser: {
        type: DataTypes.INTEGER,
        required: true
    },
    toUser: {
        type: DataTypes.INTEGER,
        required: true
    },
    convId: {
        type: DataTypes.UUIDV4,
        required: true
    },
    msg: {
        type: DataTypes.TEXT
    },
    typeOfmsg: {
        type: DataTypes.INTEGER,
        default: "text"
    },
    typeOfChat: {
        type: DataTypes.INTEGER,
        default: "text"
    },
    date: {
        type: Date,
    },
    status: {
        type: DataTypes.INTEGER,
        default: true
    }
}

const Chat = sequelize.define('Chat', ChatSchema, {
    tableName: 'chat_msg'
})
module.exports = Chat