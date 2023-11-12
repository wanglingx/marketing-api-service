const express = require('express');
const soap = require('soap');
const app = express();
const soapPort = 3000;
const services = require('./routes');
const connectDB = require('./config/database');
// const logInfo = require('./config/log')

// Set up SOAP server
const wsdlPaths = {
  ProductService: './wsdl/ProductService.wsdl',
  ShippingService: './wsdl/ShippingService.wsdl',
  OrdersService: './wsdl/OrdersService.wsdl'
};
    
app.listen(soapPort, function () {
  connectDB()
    .then(() => {
    for (const serviceName in wsdlPaths) {
      const wsdlUrl = wsdlPaths[serviceName];
      const xml = require('fs').readFileSync(wsdlUrl, 'utf8');
      const soapServer = soap.listen(app, `/${serviceName}`, services, xml);
      console.log(`[INFO] SOAP server for ${serviceName} running at http://localhost:${soapPort}/${serviceName}?wsdl`);
      // logInfo('INFO','test')
    }
  })
  .catch((err) => {
    console.error('[ERROR] Error starting the application:', err);
  });
});