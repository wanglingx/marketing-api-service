const soap = require('soap');

// Create the SOAP client
const url = 'http://localhost:3000/ConfirmOrdersService?wsdl';

soap.createClient(url, function (err, client) {
  if (err) {
    console.error('Error creating SOAP client:', err);
    return;
  }

  // Make a SOAP request
  const args = { ID_order : ''};

  client.confirmOrders(args, function (err, result) {
    if (err) {
      console.error('Error making SOAP request:', err);
      return;
    }
    // Access the result from the SOAP response
    console.log('SOAP Response:', result);
  });
});
