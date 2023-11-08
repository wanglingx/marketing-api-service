const Products = require('./ProductSchema')
const repo = require('../../repository/repository')
class ProductProcess {

    constructor() {
        this.ProductRepo = repo.ProductRepo
    }

    newProduct = async (req, res) => {
        this.ProductRepo.ID_product     = req.body.ID_product
        this.ProductRepo.Product_name   = req.body.Product_name
        this.ProductRepo.Product_price  = req.body.Product_price
        this.ProductRepo.Product_stock  = req.body.Product_stock
        this.ProductRepo.Exp_date       = req.body.Exp_date
        this.ProductRepo.Product_status = req.body.Product_status

        // ตรวจสอบความถูกต้องของข้อมูล
        if (!this.ProductRepo) {
            console.log(`[ERROR] New Products Data Not Found`)
            return res.status(400).json({
                error: "New Products Data Not Found"
            });
        }
        else {
            console.log(`[INFO] New Products Data Found`)
            // เขียนข้อมูลลงฐานข้อมูล
            const product = new Products({
                ID_product      : this.ProductRepo.ID_product,
                Product_name    : this.ProductRepo.Product_name,
                Product_price   : this.ProductRepo.Product_price,
                Product_stock   : this.ProductRepo.Product_stock,
                Exp_date        : this.ProductRepo.Exp_date,
                Product_status  : this.ProductRepo.Product_status
            });
            await product.save();
            console.log(`[INFO] Save New Products to database success`)
            return res.status(201).send({ response : product });
        }
    }

    updateProduct = async (req, res) => {
        this.ProductRepo.ID_product     = req.params.id
        this.ProductRepo.Product_price  = req.body.Product_price
        this.ProductRepo.Product_stock  = req.body.Product_stock
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!this.ProductRepo.ID_product) {
            console.log(`[ERROR] ID Products Not Found`)
            return res.status(400).json({
                error: "ID Products Not Found"
            });
        }
        // ค้นหาสินค้าจากฐานข้อมูล
        const product = await Products.findOne({ ID_product : this.ProductRepo.ID_product });
        console.log(`[INFO] Getting Products By ID ${product}`)

        if (!product) {
            console.log(`[ERROR] Product Not Found`)
            return res.status(404).json({
                error: "Product Not Found"
            });
        }
        else {
            console.log(`[INFO] Getting Products By ID ${product}`)
             // อัพเดทข้อมูลสินค้า
            const updatedProduct = {
                Product_price: this.ProductRepo.Product_price,
                Product_stock: this.ProductRepo.Product_stock,
            };

            Products.updateOne({ ID_product: this.ProductRepo.ID_product }, { $set: updatedProduct })
                .then(result => {
                    if (result.nModified === 0) {
                    return res.status(404).json({ error: "Product not found" });
                    }
                    console.log('[INFO] Product updated successfully')
                    // Fetch the updated product
                    Products.findOne({ ID_product: this.ProductRepo.ID_product })
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
    }
    
}

module.exports = {
    ProductProcess
}