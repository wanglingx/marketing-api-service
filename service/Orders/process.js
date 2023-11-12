const Orders = require('../Orders/OrdersSchema')
const OrderDetails = require('../Orders/OrderDetailSchema')

class OrdersProcess {
    order = async(OrderRepo) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!OrderRepo.ID_order || !OrderRepo.Name || !OrderRepo.Address || !OrderRepo.Tel || !OrderRepo.Order_date || !OrderRepo.Sent_date
            || !OrderRepo.Total_Price || !OrderRepo.Discount || !OrderRepo.Vat || !OrderRepo.Shipping_cost || !OrderRepo.Net_balance || !OrderRepo.Order_status) {
            console.log(`[ERROR] Order data required empty field`)
            return { error: "Order data required empty field" }
        }
        // ค้นหาข้อมูลการสั่งซื้อ
        const orderRepeatId = await Orders.findOne({ ID_order: OrderRepo.ID_order });
        if (orderRepeatId) {
            console.error(`[ERROR] ID Order : ${OrderRepo.ID_order} was used`)
            return { error: `ID Order : ${OrderRepo.ID_order} was used` }
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
        const details = OrderRepo.details;
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
        return {
            info: `Save Order Detail to database success`, data_order: {
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
                Order_status: OrderRepo.Order_status,
        }}
    }

    confirmOrders = async (ID_order) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!ID_order) {
            console.error(`[ERROR] ไม่พบ ID Order สำหรับการยืนยันออเดอร์`)
            return { error: `ไม่พบ ID Order สำหรับการยืนยันออเดอร์` }
        }
        // ค้นหาข้อมูลการสั่งซื้อ
        const order = await Orders.findOne({ ID_order: ID_order });
        if (!order) {
            console.error('[ERROR] ไม่พบข้อมูลการสั่งซื้อ')
            return { error: "ไม่พบข้อมูลการสั่งซื้อ" }
        }
        else {
            // Update multiple documents that match a query
            Orders.updateOne({ ID_order: ID_order }, { Order_status: "Confirmed" })
            .then(data => {
                if (data.nModified === 0) {
                        console.error('[ERROR] Order not found')
                        return { error: "Order not found" }
                    }
                    console.log('[INFO] Order updated successfully')
                    return { info: `Order - ${ID_order} updated successfully` }
            })
            .catch(error => {
                console.error('[ERROR] Error updating product:', error);
                return { error: "An error occurred while updating the order" }
            });
        }
    }

    cancelOrder = async (ID_order) => {
         // ตรวจสอบความถูกต้องของข้อมูล
        if (!ID_order) {
            console.error(`[ERROR] ไม่พบ  ID_order สำหรับการยกเลิกออเดอร์`)
            return {error: `ไม่พบ  ID_order สำหรับการยกเลิกออเดอร์`}
        }
        // ยิง API ไปหาคนอื่น
        // ตอบกลับ
        console.log(`[INFO] Order Canceled ID ${ID_order} Successfully`)
        return {info : `[INFO] Order Canceled ID ${ID_order} Successfully` , success: true}
    }
     

    confirmCancelOrder = async (ID_order) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!ID_order) {
            console.error(`[ERROR] ไม่พบ ID Order สำหรับยืนยันการยกเลิกออเดอร์`)
            return { error: `ไม่พบ ID Order สำหรับยืนยันการยกเลิกออเดอร์` }
        }
        // ค้นหาข้อมูลการสั่งซื้อ
        const order = await Orders.findOne({ ID_order : ID_order });
        if (!order) {
            console.error('[ERROR] ไม่พบข้อมูลการสั่งซื้อ')
            return { error: "ไม่พบข้อมูลการสั่งซื้อ" }
        }
        else {
        Orders.updateOne({ ID_product: ID_order }, { Order_status: "Cancelled" })
            .then(data => {
                    if (data.nModified === 0) {
                        console.error('[ERROR] Order not found')
                        return { error: "Order not found" }
                    }
                console.log('[INFO] Confirm Cancel Order updated successfully')
                return { info: `Order - ${ID_order} Confirm Cancel successfully`,success: true }
            })
            .catch(error => {
                console.error('[ERROR] Error updating product:', error);
                return { error: "An error occurred while updating the order" }
            });
        }
    }
}

module.exports = {
    OrdersProcess
}