const Products = require('./ProductSchema')

class ProductProcess {
    newProduct = async (ProductRepo) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!ProductRepo.ID_product || !ProductRepo.Product_name || !ProductRepo.Product_price
            || !ProductRepo.Product_stock || !ProductRepo.Exp_date || !ProductRepo.Product_status) {
            console.log(`[ERROR] New Products Data required empty field`)
            return { error: "New Products Data required empty field" }
        }
        else {
            console.log(`[INFO] New Products Data Found`)
            const productRepeatId = await Products.findOne({ ID_product: ProductRepo.ID_product });
            
            if (productRepeatId) {
                console.error(`[ERROR] ID Product : ${ProductRepo.ID_product} was used`)
                return { error: `ID Product : ${ProductRepo.ID_product} was used` }
            }
            else {
                // เขียนข้อมูลลงฐานข้อมูล
                const product = new Products({
                    ID_product: ProductRepo.ID_product,
                    Product_name: ProductRepo.Product_name,
                    Product_price: ProductRepo.Product_price,
                    Product_stock: ProductRepo.Product_stock,
                    Exp_date: ProductRepo.Exp_date,
                    Product_status: ProductRepo.Product_status
                });
                await product.save();
                console.log(`[INFO] Save New Products to database success`)
                return { info: "Save New Products to database success", response: ProductRepo }
            }
        }
    }

    updateProduct = async (ProductRepo) => {
        // ตรวจสอบความถูกต้องของข้อมูล
        if (!ProductRepo.ID_product) {
            console.log(`[ERROR] ID Products to update prices or stock Not Found`)
            return { error: "ID Products to update prices or stock Not Found" }
        }
        // ค้นหาสินค้าจากฐานข้อมูล 
        const product = await Products.findOne({ ID_product : ProductRepo.ID_product });
        console.log(`[INFO] Getting Products By ID ${product}`)

        if (!product) {
            console.log(`[ERROR] Product Not Found`)
            return { error: "Product Not Found" }
        }
        else {
            console.log(`[INFO] Getting Products By ID ${product}`)
             // อัพเดทข้อมูลสินค้า
            const updatedProduct = {
                Product_price: ProductRepo.Product_price,
                Product_stock: ProductRepo.Product_stock,
            };

            Products.updateOne({ ID_product: ProductRepo.ID_product }, { $set: updatedProduct })
                .then(async result => {
                    if (result.nModified === 0) {
                        return { error: "Product Not Found" }
                    }
                    // Fetch the updated product
                    await Products.findOne({ ID_product: ProductRepo.ID_product })
                        .then(updatedProduct => {
                        console.log('[INFO] Product updated successfully')
                        return { info: "Product updated successfully" , response : updatedProduct }
                    })
                    .catch(error => {
                        console.error('[ERROR] Error fetching updated product:', error);
                        return { error: "An error occurred while fetching the updated product" }
                    });
                })
                .catch(error => {
                    console.error('[ERROR] Error updating product:', error);
                    return { error: "An error occurred while updating the product" }
            });
        }
    }
}

module.exports = {
    ProductProcess
}