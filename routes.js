const { ShippingProcess } = require('./service/Shipping/process')
const { OrdersProcess } = require('./service/Orders/process')
const { ProductProcess } = require('./service/Product/process')
const repo = require('./service/repository');

const services = {
  ProductService: {
    productPort: {
      newProduct: async function (args) {
        console.log(`[INFO] Call function newProduct()`)
        repo.newProductRepo.ID_product = args.ID_product
        repo.newProductRepo.Product_name = args.Product_name
        repo.newProductRepo.Product_price = args.Product_price
        repo.newProductRepo.Product_stock = args.Product_stock
        repo.newProductRepo.Exp_date = args.Exp_date
        repo.newProductRepo.Product_status = args.Product_status
        const result = await new ProductProcess().newProduct(repo.newProductRepo)
        return { result: result }
      },
      updateProduct: async function (args) {
        console.log(`[INFO] Call function updateProduct()`)
        repo.updateProductRepo.ID_product = args.ID_product
        repo.updateProductRepo.Product_price = args.Product_price
        repo.updateProductRepo.Product_stock = args.Product_stock
        const result = await new ProductProcess().updateProduct(repo.updateProductRepo)
        return { result: result }
      }
    },
  },
  ShippingService: {
    shippingPort: {
      shippingCost: async function (args) {
        console.log(`[INFO] Call function shippingCost()`)
        repo.ShippingCostRepo.Shipping_cost = args.Shipping_cost;
        const result = await new ShippingProcess().shippingCost(repo.ShippingCostRepo);
        return { result: result }
      }
    },
  },
  OrdersService: {
    OrdersPort: {
      order: async function (args) {
        const orderInfo = args.order;
        //Extracting individual properties from the orderInfo
        repo.OrdersRepo.ID_order = orderInfo.ID_order;
        repo.OrdersRepo.Name = orderInfo.Name;
        repo.OrdersRepo.Address = orderInfo.Address;
        repo.OrdersRepo.Tel = orderInfo.Tel;
        repo.OrdersRepo.Order_date = orderInfo.Order_date;
        repo.OrdersRepo.Sent_date = orderInfo.Sent_date;
        repo.OrdersRepo.Total_Price = orderInfo.Total_Price;
        repo.OrdersRepo.Discount = orderInfo.Discount;
        repo.OrdersRepo.Vat = orderInfo.Vat;
        repo.OrdersRepo.Shipping_cost = orderInfo.Shipping_cost;
        repo.OrdersRepo.Net_balance = orderInfo.Net_balance;
        repo.OrdersRepo.Order_status = orderInfo.Order_status;

        // Extracting details if available
        if (orderInfo.details) {
            repo.OrdersRepo.details = orderInfo.details.map(detail => ({
                ID_product: detail.ID_product,
                Amount: detail.Amount,
                Total_price: detail.Total_price,
                Discount: detail.Discount
            }));
        }
        const result = await new OrdersProcess().order(repo.OrdersRepo);
        return { result: result }
      },
      confirmOrders: async function (args) {
        console.log(`[INFO] Call function confirmOrders()`)
        const ID_order = args.ID_order;
        const result = await new OrdersProcess().confirmOrders( ID_order );
        return { result: result }
      },
      cancelOrder: async function (args) {
        console.log(`[INFO] Call function cancelOrder()`)
        const ID_order = args.ID_order;
        const result = await new OrdersProcess().cancelOrder( ID_order );
        return { result: result }
      },
      confirmCancelOrder: async function (args) {
        console.log(`[INFO] Call function confirmCancelOrder()`)
        const ID_order = args.ID_order;
        const result = await new OrdersProcess().confirmCancelOrder( ID_order );
        return { result: result }
      }
    }
  }
};
module.exports = services;
