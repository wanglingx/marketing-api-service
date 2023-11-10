const Products = require('./ProductSchema')

class ProductProcess {
    newProduct = async (ProductRepo, callback) => {

        // ตรวจสอบความถูกต้องของข้อมูล
        if (!ProductRepo.Exp_date || !ProductRepo.Product_name || !ProductRepo.Product_price
            || !ProductRepo.Product_stock || !ProductRepo.Exp_date || !ProductRepo.Product_status) {
            console.log(`[ERROR] New Products Data Not Found`)
            const result = {
                error: "New Products Data Not Found"
            }
            // return res.status(400).json({
            //     error: "New Products Data Not Found"
            // });
            callback(null, result); 
        }
        else {
            console.log(`[INFO] New Products Data Found`)
            // เขียนข้อมูลลงฐานข้อมูล
            const product = new Products({
                ID_product      : ProductRepo.ID_product,
                Product_name    : ProductRepo.Product_name,
                Product_price   : ProductRepo.Product_price,
                Product_stock   : ProductRepo.Product_stock,
                Exp_date        : ProductRepo.Exp_date,
                Product_status  : ProductRepo.Product_status
            });
            await product.save();
            console.log(`[INFO] Save New Products to database success`)
            const result = {
                info: "Save New Products to database success"
            }
            callback(null, result);
            // return res.status(201).send({ response : product });
        }
    }

    updateProduct = async (ProductRepo, callback) => {
      
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!ProductRepo.ID_product) {
            console.log(`[ERROR] ID Products Not Found`)
            // return res.status(400).json({
            //     error: "ID Products Not Found"
            // });
            const result = {
                error: "ID Products Not Found"
            }
            callback(null, result);  
        }
        // ค้นหาสินค้าจากฐานข้อมูล
        const product = await Products.findOne({ ID_product : ProductRepo.ID_product });
        console.log(`[INFO] Getting Products By ID ${product}`)

        if (!product) {
            console.log(`[ERROR] Product Not Found`)
            // return res.status(404).json({
            //     error: "Product Not Found"
            // });
            const result = {
                error: "Product Not Found"
            }
            callback(null, result); 
        }
        else {
            console.log(`[INFO] Getting Products By ID ${product}`)
             // อัพเดทข้อมูลสินค้า
            const updatedProduct = {
                Product_price: ProductRepo.Product_price,
                Product_stock: ProductRepo.Product_stock,
            };

            Products.updateOne({ ID_product: ProductRepo.ID_product }, { $set: updatedProduct })
                .then(result => {
                    if (result.nModified === 0) {
                        //return res.status(404).json({ error: "Product not found" });
                        const result = {
                            error: "Product Not Found"
                        }
                        callback(null, result); 
                    }
                    console.log('[INFO] Product updated successfully')
                    // Fetch the updated product
                    Products.findOne({ ID_product: ProductRepo.ID_product })
                        .then(updatedProduct => {
                            //return res.status(200).json({ response: updatedProduct });
                            const result = {
                                response: updatedProduct
                            }
                            callback(null, result); 
                        })
                        .catch(error => {
                            console.error('[ERROR] Error fetching updated product:', error);
                            const result = {
                                error: "An error occurred while fetching the updated product"
                            }
                            callback(null, result);
                            //return res.status(500).json({ error: "An error occurred while fetching the updated product" });
                        });
                })
                .catch(error => {
                    console.error('[ERROR] Error updating product:', error);
                        const result = {
                                error: "An error occurred while updating the product"
                            }
                        callback(null, result);
                    //return res.status(500).json({ error: "An error occurred while updating the product" });
            });
        }
    }
    
}

module.exports = {
    ProductProcess
}