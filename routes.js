const { ShippingProcess } = require('./service/Shipping/process')
const repo = require('./service/repository')

const services = {
  // Define the service implementation for each service
  shippingService: {
    shippingCostPort: {
      shippingCost: function (args, callback) {
        repo.ShippingCostRepo.Shipping_cost = args.Shipping_cost
        new ShippingProcess().shippingCost(repo.ShippingCostRepo, callback)
      }
    }
  },
  
  // Service2: {
  //   Service2Port: {
  //     Operation3: function(args, callback) {
  //       // Perform the logic for Operation3
  //       const result = {
  //         message: 'Hello from Service2 Operation3!'
  //       };
  //       callback(null, result);
  //     },
  //     Operation4: function(args, callback) {
  //       // Perform the logic for Operation4
  //       const result = {
  //         message: 'Hello from Service2 Operation4!'
  //       };
  //       callback(null, result);
  //     },
  //   },
  // },
  // ... Define service implementations for the remaining four services
};

module.exports = services