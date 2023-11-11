const express = require('express');
const soap = require('soap');
const app = express();
const soapPort = 3000;
const services = require('./routes');
const connectDB = require('./config/database');

// Set up SOAP server
const wsdlPaths = {
  ShippingCostService: './wsdl/ShippingCostService.wsdl',
  ConfirmOrdersService: './wsdl/ConfirmOrdersService.wsdl'
      // ProductService: './wsdl/productService.wsdl',
};
    
app.listen(soapPort, function () {
  connectDB()
    .then(() => {
    for (const serviceName in wsdlPaths) {
      const wsdlUrl = wsdlPaths[serviceName];
      const xml = require('fs').readFileSync(wsdlUrl, 'utf8');
      const soapServer = soap.listen(app, `/${serviceName}`, services, xml);
      console.log(`SOAP server for ${serviceName} running at http://localhost:${soapPort}/${serviceName}?wsdl`);
    }
  })
  .catch((err) => {
    console.error('Error starting the application:', err);
  });
});