const router = express.Router();
const express = require('express');


// POST /products
router.post("/", async (req, res) => {
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!req.body.ID_product || !req.body.Product_name || !req.body.Product_price || !req.body.Product_stock || !req.body.Exp_date || !req.body.Product_status) {
        return res.status(400).json({
            error: "ข้อมูลไม่ถูกต้อง"
        });
    }

    // เขียนข้อมูลลงฐานข้อมูล
    const product = new Products({
        ID_product: req.body.ID_product,
        Product_name: req.body.Product_name,
        Product_price: req.body.Product_price,
        Product_stock: req.body.Product_stock,
        Exp_date: req.body.Exp_date,
        Product_status: req.body.Product_status
    });
    await product.save();

    // ตอบกลับ
    res.json(product);
});

// PUT /products/:id
router.put("/:id", async (req, res) => {
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!req.params.id || !req.body.Product_name || !req.body.Product_price || !req.body.Product_stock || !req.body.Exp_date || !req.body.Product_status) {
        return res.status(400).json({
            error: "ข้อมูลไม่ถูกต้อง"
        });
    }

    // ค้นหาสินค้าจากฐานข้อมูล
    const product = await Products.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            error: "สินค้าไม่พบ"
        });
    }

    // อัพเดทข้อมูลสินค้า
    product.Product_name = req.body.Product_name;
    product.Product_price = req.body.Product_price;
    product.Product_stock = req.body.Product_stock;
    product.Exp_date = req.body.Exp_date;
    product.Product_status = req.body.Product_status;
    await product.save();

    // ตอบกลับ
    res.json(product);
});

// POST /shipping-cost
router.post("/", async (req, res) => {
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!req.body.Shipping_cost) {
        return res.status(400).json({
            error: "ข้อมูลไม่ถูกต้อง"
        });
    }

    // ใส่ค่าลงในฐานข้อมูล Marketing Meta DB
    const shippingCost = new ShippingCost({
        Shipping_cost: req.body.Shipping_cost
    });
    await shippingCost.save();

    // ตอบกลับ
    res.json(shippingCost);
});

// POST /orders
router.post("/", async (req, res) => {
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!req.body.ID_order || !req.body.Name || !req.body.Address || !req.body.Tel || !req.body.Order_date || !req.body.Sent_date || !req.body.Total_Price || !req.body.Discount || !req.body.Vat || !req.body.Shipping_cost || !req.body.Net_balance || !req.body.Order_status) {
        return res.status(400).json({
            error: "ข้อมูลไม่ถูกต้อง"
        });
    }

    // เพิ่มข้อมูลลงฐานข้อมูล Header DB
    const order = new Orders({
        ID_order: req.body.ID_order,
        Name: req.body.Name,
        Address: req.body.Address,
        Tel: req.body.Tel,
        Order_date: req.body.Order_date,
        Sent_date: req.body.Sent_date,
        Total_Price: req.body.Total_Price,
        Discount: req.body.Discount,
        Vat: req.body.Vat,
        Shipping_cost: req.body.Shipping_cost,
        Net_balance: req.body.Net_balance,
        Order_status: req.body.Order_status
    });
    await order.save();

    // เพิ่มข้อมูลลงฐานข้อมูล Detail DB
    const details = req.body.details;
    for (const detail of details) {
        const orderDetail = new OrderDetails({
            ID_order: req.body.ID_order,
            ID_product: detail.ID_product,
            Amount: detail.Amount,
            Total_price: detail.Total_price,
            Discount: detail.Discount
        });
        await orderDetail.save();
    }

    // ยิง API ไปหาคนอื่น

    // ตอบกลับ
    res.json({
        success: true
    });
});

// PUT /orders/:id
router.put("/:id", async (req, res) => {
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!req.params.id) {
        return res.status(400).json({
            error: "ID_order ไม่ถูกต้อง"
        });
    }

    // ค้นหาข้อมูลการสั่งซื้อ
    const order = await Orders.findById(req.params.id);
    if (!order) {
        return res.status(404).json({
            error: "ไม่พบข้อมูลการสั่งซื้อ"
        });
    }

    // เปลี่ยนค่า Order_status
    order.Order_status = "Confirmed";
    await order.save();

    // ตอบกลับ
    res.json({
        success: true
    });
});

// POST /cancel-orders
router.post("/", async (req, res) => {
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!req.body.ID_order) {
        return res.status(400).json({
            error: "ID_order ไม่ถูกต้อง"
        });
    }

    // ยิง API ไปหาคนอื่น

    // ตอบกลับ
    res.json({
        success: true
    });
});

// PUT /orders/cancel/:id
router.put("/cancel/:id", async (req, res) => {
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!req.params.id) {
        return res.status(400).json({
            error: "ID_order ไม่ถูกต้อง"
        });
    }

    // ค้นหาข้อมูลการสั่งซื้อ
    const order = await Orders.findById(req.params.id);
    if (!order) {
        return res.status(404).json({
            error: "ไม่พบข้อมูลการสั่งซื้อ"
        });
    }

    // เปลี่ยนค่า Order_status
    order.Order_status = "Cancelled";
    await order.save();

    // ตอบกลับ
    res.json({
        success: true
    });
});


module.exports = router;
