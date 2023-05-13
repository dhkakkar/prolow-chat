const { DataTypes } = require("sequelize");
const { sequelize } = require('../connection')

const UserSchema = {
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        required: true
    },
    name : {
        type: DataTypes.TEXT,
        required: true
    },
    mobileNo : {
        type: DataTypes.TEXT,
    },
    mobileNoverify: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.TEXT,
    },
    googleLoginId: {
        type: DataTypes.TEXT,
    },
    facebookLoginId: {
        type: DataTypes.TEXT,
    },
    password: {
        type: DataTypes.TEXT,
        required: true
    },
    deviceToken: {
        type: DataTypes.TEXT,
    },
    userType: {
        type: DataTypes.TEXT,
        required: true
    },
    status: {
        type: DataTypes.INTEGER,
        default: true
    },
    createdAt: {
        type: DataTypes.TEXT
    },
    createdBy: {
        type: DataTypes.TEXT
    },
    modifiedAt: {
        type: DataTypes.TEXT
    },
    modifiedBy: {
        type: DataTypes.TEXT
    },
}

const user = sequelize.define('user', UserSchema, {
    tableName: 'user'
})
module.exports = user