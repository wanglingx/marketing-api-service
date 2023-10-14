const express = require('express');
const router = express.Router()
const { ProductProcess } = require('../service/Product/process');
const { ShippingProcess } = require('../service/Shipping/Process');
const { OrdersProcess } = require('../service/Orders/process');

/** Product */
router.post("/new-product",new ProductProcess().newProduct)
router.get("/update-product/:id", new ProductProcess().updateProduct)

/** Shipping */
router.post("/shipping-cost", new ShippingProcess().shippingCost)

/** Orders */
router.post("/order", new OrdersProcess().order)
router.get("/confirm-order/:id", new OrdersProcess().confirmOrders)
router.post("/cancel-order", new OrdersProcess().cancelOrder)
router.get("/cancel/:id", new OrdersProcess().confirmCancelOrder)

module.exports = router;