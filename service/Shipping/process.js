const ShippingCost = require('./ShippingCostSchema')

class ShippingProcess {
    shippingCost = async (shippingCostRepo) => {
        console.log(shippingCostRepo.Shipping_cost)
        if (!shippingCostRepo.Shipping_cost || shippingCostRepo.Shipping_cost == 0 ) {
            console.error(`[ERROR] Shipping Cost Data Not Found`)
            return { error: "Shipping Cost Data Not Found" }
        }
        else {
            console.log(`[INFO] Shipping Cost Data Found`)
            // ใส่ค่าลงในฐานข้อมูล Marketing Meta DB
            const shippingCost = new ShippingCost({
                Shipping_cost: shippingCostRepo.Shipping_cost
            });
            await shippingCost.save();
            console.log(`[INFO] Save Shipping Cost to database success`)
            return {info: "Saving Shipping Cost success", Shipping_cost: shippingCost.Shipping_cost, }
        }
    }
}

module.exports = {
    ShippingProcess
}