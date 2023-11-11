const Orders = require('../Orders/OrdersSchema')
const OrderDetails = require('../Orders/OrderDetailSchema')

class OrdersProcess {

    order = async(OrderRepo ,OrderDetailsRepo, callback) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!OrderRepo.ID_order || !OrderRepo.Name || !OrderRepo.Address || !OrderRepo.Tel || !OrderRepo.Order_date || !OrderRepo.Sent_date
            || !OrderRepo.Total_Price || !OrderRepo.Discount || !OrderRepo.Vat || !OrderRepo.Shipping_cost || !OrderRepo.Net_balance || !OrderRepo.Order_status) {
            console.log(`[ERROR] Order data required empty field`)
            // return res.status(400).json({
            //     error: "Order data required empty field"
            // });
            const result = {
                error: "Order data required empty field"
            }
            callback(null, result);
        }

        console.log(`[INFO] Orders Data Found`)
        // เพิ่มข้อมูลลงฐานข้อมูล Header DB
        const order = new Orders({
            ID_order    : OrderRepo.ID_order,
            Name        : OrderRepo.Name,
            Address     : OrderRepo.Address,
            Tel         : OrderRepo.Tel,
            Order_date  : OrderRepo.Order_date,
            Sent_date   : OrderRepo.Sent_date,
            Total_Price : OrderRepo.Total_Price,
            Discount    : OrderRepo.Discount,
            Vat         : OrderRepo.Vat,
            Shipping_cost   : OrderRepo.Shipping_cost,
            Net_balance     : OrderRepo.Net_balance,
            Order_status    : OrderRepo.Order_status
        });
        await order.save();
        console.log(`[INFO] Save Order to database success`)

        // เพิ่มข้อมูลลงฐานข้อมูล Detail DB
        const details = OrderDetailsRepo.details;
        
        for (const detail of details) {
            const orderDetail = new OrderDetails({
                ID_order    : OrderRepo.ID_order,
                ID_product  : detail.ID_product,
                Amount      : detail.Amount,
                Total_price : detail.Total_price,
                Discount    : detail.Discount
            });
            await orderDetail.save();
        }
        console.log(`[INFO] Save Order Detail to database success`)
        // ยิง API ไปหาคนอื่น
        // ตอบกลับ
        // return res.json({
        //     success: true
        // });
        const result = {
                success: true
            }
        callback(null, result);
    }

    confirmOrders = async (ID_order) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!ID_order) {
            // return res.status(400).json({
            //     error: "ID_order ไม่ถูกต้อง"
            // });
            return { error: "ID_order ไม่ถูกต้อง" }
        }
        // ค้นหาข้อมูลการสั่งซื้อ
        const order = await Orders.find({ ID_order: ID_product });
        if (!order) {
            // return res.status(404).json({
            //     error: "ไม่พบข้อมูลการสั่งซื้อ"
            // });
            return { error: "ไม่พบข้อมูลการสั่งซื้อ" }
        }
        else {
            // Update multiple documents that match a query
            Orders.updateOne({ ID_order: ID_order }, { Order_status: "Confirmed" })
            .then(data => {
                    if (data.nModified === 0) {
                       // return res.status(404).json({ error: "Order not found" });
                        return { error: "Order not found" }
                    }
                    console.log('[INFO] Order updated successfully')
                //return res.status(200).json({ success: true });
                return { success: true }
                })
                .catch(error => {
                    console.error('[ERROR] Error updating product:', error);
                    //return res.status(500).json({ error: "An error occurred while updating the order" });
                    return { error: "An error occurred while updating the order" }
                });
        }
    }

    cancelOrder = async (ID_order, callback) => {
         // ตรวจสอบความถูกต้องของข้อมูล
        if (!ID_order) {
            // return res.status(400).json({
            //     error: "ID_order ไม่ถูกต้อง"
            // });
            const result = {
                    error: "ID_order ไม่ถูกต้อง"
                }
            callback(null, result);
        }
        // ยิง API ไปหาคนอื่น
        // ตอบกลับ
        const result = {
            success: true
        }
        callback(null, result);
    }

    confirmCancelOrder = async (ID_order, callback) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!ID_order) {
            // return res.status(400).json({
            //     error: "ID_order ไม่ถูกต้อง"
            // });
            const result = {
                    error: "ID_order ไม่ถูกต้อง"
                }
            callback(null, result);
        }

        // ค้นหาข้อมูลการสั่งซื้อ
        const order = await Orders.findOne({ ID_order : ID_order });
        if (!order) {
            // return res.status(404).json({
            //     error: "ไม่พบข้อมูลการสั่งซื้อ"
            // });
            const result = {
                    error: "ไม่พบข้อมูลการสั่งซื้อ"
                }
            callback(null, result);
        }
        else {
        Orders.updateOne({ ID_product: ID_order }, { Order_status: "Cancelled" })
            .then(data => {
                    if (data.nModified === 0) {
                        //return res.status(404).json({ error: "Order not found" });
                        const result = {
                            error: "Order not found"
                        }
                        callback(null, result);
                    }
                    console.log('[INFO] Order updated successfully')
                // return res.status(200).json({ success: true });
                const result = {
                    success: true
                }
                callback(null, result);
                
                })
                .catch(error => {
                    console.error('[ERROR] Error updating product:', error);
                   // return res.status(500).json({ error: "An error occurred while updating the order" });
                    const result = {
                        error: "An error occurred while updating the order" 
                    }
                    callback(null, result);
                });
        }
    }
}

module.exports = {
    OrdersProcess
}