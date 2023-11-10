const mongoose = require('mongoose')

const OrdersSchema = new mongoose.Schema({
    ID_order: {
        type: String,
        required: true,
        unique: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Tel: {
        type: String,
        required: true,
    },
    Order_date: {
        type: Date,
        required: true,
    },
    Sent_date: {
        type: Date,
        required: true,
    },
    Total_Price: {
        type: Number,
        required: true,
    },
    
    Vat: {
        type: Number,
        required: true,
    },
    Shipping_cost: {
        type: Number,
        required: true,
    },
    Net_balance: {
        type: Number,
        required: true,
    },
    Order_status: {
       type: String,
       required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('orders', OrdersSchema)