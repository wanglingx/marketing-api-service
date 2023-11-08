const Orders = require('../Orders/OrdersSchema')
const OrderDetails = require('../Orders/OrderDetailSchema')
const repo = require('../../repository/repository')

class OrdersProcess {
    constructor() {
        this.OrderDetailsRepo = repo.OrderDetailsRepo
        this.OrderRepo = repo.OrdersRepo
    }

    order = async(req, res) => {
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
        return res.json({
            success: true
        });
    }

    confirmOrders = async (req, res) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!req.params.id) {
            return res.status(400).json({
                error: "ID_order ไม่ถูกต้อง"
            });
        }
        // ค้นหาข้อมูลการสั่งซื้อ
        const order = await Orders.find({ ID_order: req.params.id });
        if (!order) {
            return res.status(404).json({
                error: "ไม่พบข้อมูลการสั่งซื้อ"
            });
        }
        else {
            // Update multiple documents that match a query
            Orders.updateOne({ ID_product: req.params.id }, { Order_status: "Confirmed" })
            .then(result => {
                    if (result.nModified === 0) {
                    return res.status(404).json({ error: "Order not found" });
                    }
                    console.log('[INFO] Order updated successfully')
                    return res.status(200).json({ success : true });
                })
                .catch(error => {
                    console.error('[ERROR] Error updating product:', error);
                    return res.status(500).json({ error: "An error occurred while updating the order" });
                });
        }
    }

    cancelOrder = async (req, res) => {
         // ตรวจสอบความถูกต้องของข้อมูล
        if (!req.body.ID_order) {
            return res.status(400).json({
                error: "ID_order ไม่ถูกต้อง"
            });
        }

        // ยิง API ไปหาคนอื่น
        // ตอบกลับ
        return res.json({
            success: true
        });
    }

    confirmCancelOrder = async (req, res) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!req.params.id) {
            return res.status(400).json({
                error: "ID_order ไม่ถูกต้อง"
            });
        }

        // ค้นหาข้อมูลการสั่งซื้อ
        const order = await Orders.findOne({ ID_order : req.params.id });
        if (!order) {
            return res.status(404).json({
                error: "ไม่พบข้อมูลการสั่งซื้อ"
            });
        }
        else {
        Orders.updateOne({ ID_product: req.params.id }, { Order_status: "Cancelled" })
            .then(result => {
                    if (result.nModified === 0) {
                    return res.status(404).json({ error: "Order not found" });
                    }
                    console.log('[INFO] Order updated successfully')
                    return res.status(200).json({ success : true });
                })
                .catch(error => {
                    console.error('[ERROR] Error updating product:', error);
                    return res.status(500).json({ error: "An error occurred while updating the order" });
                });
        }
    }
}

module.exports = {
    OrdersProcess
}