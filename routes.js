const { ShippingProcess } = require('./service/Shipping/process');
const repo = require('./service/repository');

const services = {
  // Define the service implementation for each service
  NewProductService: {
    newProductPort: {
      newProduct: function (args, callback) {
        // Implement your logic for newProduct service
        // You can use args to access input parameters
        // Call the callback function with the result
        callback({
          result: 'New product added successfully'
        });
      }
    }
  },
  UpdateProductService: {
    updateProductPort: {
      updateProduct: function (args, callback) {
        // Implement your logic for updateProduct service
        // You can use args to access input parameters
        // Call the callback function with the result
        callback({
          result: 'Product updated successfully'
        });
      }
    }
  },
  ShippingCostService: {
    shippingCostPort: {
      shippingCost: function (args, callback) {
        repo.ShippingCostRepo.Shipping_cost = args.Shipping_cost;
        new ShippingProcess().shippingCost(repo.ShippingCostRepo, callback);
      }
    }
  },
  OrderService: {
    orderPort: {
      order: function (args, callback) {
        // Implement your logic for order service
        // You can use args to access input parameters
        // Call the callback function with the result
        callback({
          result: 'Order placed successfully'
        });
      }
    }
  },
  ConfirmOrdersService: {
    confirmOrdersPort: {
      confirmOrders: function (args, callback) {
        // Implement your logic for confirmOrders service
        // You can use args to access input parameters
        // Call the callback function with the result
        callback({
          result: 'Order confirmed successfully'
        });
      }
    }
  },
  CancelOrderService: {
    cancelOrderPort: {
      cancelOrder: function (args, callback) {
        // Implement your logic for cancelOrder service
        // You can use args to access input parameters
        // Call the callback function with the result
        callback({
          result: 'Order canceled successfully'
        });
      }
    }
  },
  ConfirmCancelOrderService: {
    confirmCancelOrderPort: {
      confirmCancelOrder: function (args, callback) {
        // Implement your logic for confirmCancelOrder service
        // You can use args to access input parameters
        // Call the callback function with the result
        callback({
          result: 'Order cancellation confirmed successfully'
        });
      }
    }
  }
};

module.exports = services;
