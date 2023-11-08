const mongoose = require('mongoose')

const ShippingCostSchema = new mongoose.Schema({
  Shipping_cost: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('shipping_cost', ShippingCostSchema)