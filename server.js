const soap = require('soap');
const fs = require('fs');
const services = require('./routes')
const connectDB = require('./config/database'); 
connectDB(); 

// Create the SOAP servers for each service
const wsdlPaths = {
  WeatherService: './wsdl/weatherService.wsdl',
  ProductService: './wsdl/productService.wsdl',
  // ... Provide WSDL paths for the remaining four services
};

for (const serviceName in wsdlPaths) {
  const xml = require('fs').readFileSync(wsdlPaths[serviceName], 'utf8');
  const server = soap.listen({ path: `/${serviceName}`, xml: xml }, function() {
    console.log(`SOAP server for ${serviceName} running at http://localhost:8000/${serviceName}?wsdl`);
  });
  server.addService(xml, services[serviceName], { suppressStack: true });
}