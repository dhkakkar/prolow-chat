const { DataTypes } = require("sequelize");
const { sequelize } = require('../connection')

const BookingSchema = {
    booking_id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        required: true
    },
    booking_type: {
        type: DataTypes.INTEGER,
        required: true
    },
    driverId: {
        type: DataTypes.INTEGER,
    },
    customerId: {
        type: DataTypes.INTEGER,
        required: true
    },
    vendorId: {
        type: DataTypes.INTEGER,
    },
    corporate: {
        type: DataTypes.INTEGER,
    },
    bookingDate: {
        type: Date,
    },
    longitudeFrom: {
        type: DataTypes.TEXT,
        required: true
    },
    latitudeFrom: {
        type: DataTypes.TEXT,
        required: true
    },
    longitudeTo: {
        type: DataTypes.TEXT,
        required: true
    },
    latitudeTo: {
        type: DataTypes.TEXT,
        required: true
    },
    fromName: {
        type: DataTypes.TEXT,
        required: true
    },
    toName: {
        type: DataTypes.TEXT,
        required: true
    },
    bookingAmount: {
        type: DataTypes.TEXT,
    },
    adult: {
        type: DataTypes.TEXT,
    },
    estimation: {
        type: DataTypes.TEXT,
    },
    customer_type: {
        type: DataTypes.INTEGER, // 0 - family Booking, 1 - corporate
    },
    status: {
        type: DataTypes.INTEGER,
        default: true
    }
}

const Booking = sequelize.define('Booking', BookingSchema, {
    tableName: 'booking'
})
module.exports = Booking