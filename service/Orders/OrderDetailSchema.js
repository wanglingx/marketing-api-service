const mongoose = require('mongoose')

const OrdersDetailSchema = new mongoose.Schema({
    ID_order: {
        type: String,
        required: true,
    },
    ID_product: {
        type: String,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
    Total_price: {
        type: Number,
        required: true,
    },
    Discount: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('orders_detail', OrdersDetailSchema)