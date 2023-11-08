const ShippingCost = require('./ShippingCostSchema')
const repo = require('../../repository/repository')
class ShippingProcess {

    constructor() {
        this.shippingCostRepo = repo.ShippingCostRepo
    }

    shippingCost = async (req, res) => {
        this.shippingCostRepo.Shipping_cost = req.body.Shipping_cost

        if (!this.shippingCostRepo.Shipping_cost) {
            console.log(`[ERROR] Shipping Cost Data Not Found`)
            return res.status(400).json({
                error: "Shipping Cost Data Not Found"
            });
        }
        else {
            console.log(`[INFO] Shipping Cost Data Found`)
            // ใส่ค่าลงในฐานข้อมูล Marketing Meta DB
            const shippingCost = new ShippingCost({
                Shipping_cost: this.shippingCostRepo.Shipping_cost
            });
            await shippingCost.save();
            console.log(`[INFO] Save Shipping Cost to database success`)
            return res.status(200).send({ response : shippingCost });    
        }  
    }

}
module.exports = {
    ShippingProcess
}