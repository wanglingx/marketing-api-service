module.exports = {
    OrdersRepo : {
        ID_order: '',
        Name: '',
        Address:'',
        Tel: '',
        Order_date: '',
        Sent_date: '',
        Total_Price: '',
        Vat: '',
        Shipping_cost: '',
        Net_balance:'',
        Order_status: '',
        created_at: ''
    },
    OrderDetailsRepo: {
        ID_order: '',
        ID_product: '',
        Amount: '',
        Total_price: '',
        Discount: '',
        created_at: ''
    },
    ProductRepo: {
        ID_product: '',
        Product_name: '',
        Product_price: '',
        Product_stock: '',
        Discount: '',
        Exp_date: '',
        Product_status: '',
        created_at: ''
    },
    ShippingCostRepo: {
        Shipping_cost: '',
        created_at: '' 
    }
}