const ShippingCost = require('./ShippingCostSchema')

class ShippingProcess {
    shippingCost = async (shippingCostRepo, callback) => {
        if (!shippingCostRepo.Shipping_cost) {
            console.log(`[ERROR] Shipping Cost Data Not Found`)
            const result = {
                error: "Shipping Cost Data Not Found"
            }
            callback(null, result); 
            // return res.status(400).json({
            //     error: "Shipping Cost Data Not Found"
            // });
        }
        else {
            console.log(`[INFO] Shipping Cost Data Found`)
            // ใส่ค่าลงในฐานข้อมูล Marketing Meta DB
            const shippingCost = new ShippingCost({
                Shipping_cost: shippingCostRepo.Shipping_cost
            });
            await shippingCost.save();
            console.log(`[INFO] Save Shipping Cost to database success`)
            //return res.status(200).send({ response : shippingCost });  
            const result = {
                info: "Saving Shipping Cost success",
                Shipping_cost: shippingCost.Shipping_cost,
            }
            callback(null, result);    
        }
    }
}

module.exports = {
    ShippingProcess
}