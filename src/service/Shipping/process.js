const ShippingCost = require('./ShippingCostSchema')
class ShippingProcess {
    shippingCost =  async(req, res) => {
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
       return res.status(200).send({ response : shippingCost });
    }
}

module.exports = {
    ShippingProcess
}