const { ShippingProcess } = require('./service/Shipping/process')
const { OrdersProcess } = require('./service/Orders/process')
const repo = require('./service/repository');

const services = {
  ShippingCostService: {
    shippingCostPort: {
      shippingCost: async function (args) {
        repo.ShippingCostRepo.Shipping_cost = args.Shipping_cost;
        const result = await new ShippingProcess().shippingCost(repo.ShippingCostRepo);
        return { result: result }
      }
    },
  },
  ConfirmOrdersService: {
    confirmOrdersPort: {
      confirmOrders: async function (args) {
        const ID_order = args.ID_order;
        const result = await new OrdersProcess().confirmOrders( ID_order );
        return { result: result }
      }
    }
  }
};
module.exports = services;


// updateProduct: function (args, callback) {
      //   // Implement your logic for updateProduct service
      //   // You can use args to access input parameters
      //   // Call the callback function with the result
      //   callback({
      //     result: 'Product updated successfully'
      //   });
      // },