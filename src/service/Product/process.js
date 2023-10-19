const Products = require('./ProductSchema')
class ProductProcess {
    newProduct = async(req, res) => {
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
        return res.status(201).send({ response : product });
    }

    updateProduct = async (req, res) => { 
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!req.params.id) {
            return res.status(400).json({
                error: "ข้อมูลไม่ถูกต้อง"
            });
        }

        // ค้นหาสินค้าจากฐานข้อมูล
        const product = await Products.findOne({ ID_product : req.params.id });

        if (!product) {
            return res.status(404).json({
                error: "สินค้าไม่พบ"
            });
        }
        else {
             // อัพเดทข้อมูลสินค้า
            const updatedProduct = {
                //Product_name: req.body.Product_name,
                Product_price: req.body.Product_price,
                Product_stock: req.body.Product_stock,
                //Exp_date: req.body.Exp_date,
                //Product_status: req.body.Product_status,
            };

            Products.updateOne({ ID_product: req.params.id }, { $set: updatedProduct })
                .then(result => {
                    if (result.nModified === 0) {
                    return res.status(404).json({ error: "Product not found" });
                    }
                    console.log('[INFO] Product updated successfully')
                    // Fetch the updated product
                    Products.findOne({ ID_product: req.params.id })
                        .then(updatedProduct => {
                            return res.status(200).json({ response: updatedProduct });
                        })
                        .catch(error => {
                            console.error('[ERROR] Error fetching updated product:', error);
                            return res.status(500).json({ error: "An error occurred while fetching the updated product" });
                        });
                })
                .catch(error => {
                    console.error('[ERROR] Error updating product:', error);
                    return res.status(500).json({ error: "An error occurred while updating the product" });
                });
        }
        // product.Product_name = req.body.Product_name;
        // product.Product_price = req.body.Product_price;
        // product.Product_stock = req.body.Product_stock;
        // product.Exp_date = req.body.Exp_date;
        // product.Product_status = req.body.Product_status;
        // await product.save();
        // ตอบกลับ
    }
    
}

module.exports = {
    ProductProcess
}