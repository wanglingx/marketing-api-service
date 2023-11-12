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
                const fetchedProduct = await Products.findOne({ ID_product: ProductRepo.ID_product });
                return {
                    info: "Save New Products to database success", data_product: {
                        ID_product: fetchedProduct.ID_product,
                        Product_name: fetchedProduct.Product_name,
                        Product_price: fetchedProduct.Product_price,
                        Product_stock: fetchedProduct.Product_stock,
                        Product_status: fetchedProduct.Product_status,
                    }
                };
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
            const updatedProduct = {
                Product_price: ProductRepo.Product_price,
                Product_stock: ProductRepo.Product_stock,
            }
            // Update the product in the database
            const updatedProductResult = await Products.updateOne({ ID_product: ProductRepo.ID_product }, { $set: updatedProduct });

            if (updatedProductResult.nModified === 0) {
                return { error: 'Product Not Found' };
            }
            const fetchedUpdatedProduct = await Products.findOne({ ID_product: ProductRepo.ID_product });
            console.log(`[INFO] Product updated successfully ${fetchedUpdatedProduct}`);
            return {
                info: 'Product updated successfully', data_product: {
                    ID_product: fetchedUpdatedProduct.ID_product,
                    Product_price: fetchedUpdatedProduct.Product_stock,
                    Product_status: fetchedUpdatedProduct.Product_status
            }};
        }
    }
}

module.exports = {
    ProductProcess
}