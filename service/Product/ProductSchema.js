const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    ID_product: {
      type: String,
      required: true,
      unique: true,
    },
    Product_name: {
      type: String,
      required: true,
    },
    Product_price: {
      type: Number,
    },
    Product_stock: {
      type: Number,
    },
    Discount: {
      type: Number,
    },
    Exp_date: {
      type: Date,
    },
    Product_status: {
       type: String,
       required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
})

module.exports = mongoose.model('product', ProductSchema)