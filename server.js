const express = require('express');
const soap = require('soap');
const app = express();
const soapPort = 3000;
const services = require('./routes');
const connectDB = require('./config/database');

// Create a SOAP server and listen for SOAP requests
app.listen(soapPort, function () {
  connectDB()
    .then(() => {
      const wsdlPath = './wsdl/MarketingService.wsdl';
      const xml = require('fs').readFileSync(wsdlPath, 'utf8');
      const soapServer = soap.listen(app, '/Marketing', services, xml);
      console.log(`SOAP server listening on port ${soapPort}`);
    })
    .catch((err) => {
      console.error('Error starting the application:', err);
    });
});
