const soap = require('soap');

// Create the SOAP client
const url = 'http://localhost:3000/OrdersService?wsdl';

soap.createClient(url, function (err, client) {
  if (err) {
    console.error('Error creating SOAP client:', err);
    return;
  }

  // Make a SOAP request
  const args = { ID_order : ''};

  client.confirmOrders(args, function (err, result) {
    if (err) {
      console.error('Error making SOAP1 request:', err);
      return;
    }
    // Access the result from the SOAP response
    console.log('SOAP1 Response:', result);
  });

  const args1 = { ID_order : '999'};
  client.cancelOrder (args1, function (err, result) {
    if (err) {
      console.error('Error making SOAP2 request:', err);
      return;
    }
    // Access the result from the SOAP response
    console.log('SOAP2 Response:', result);
  });

  const args2 = { ID_order : ''};
  client.confirmCancelOrder(args2, function (err, result) {
    if (err) {
      console.error('Error making SOAP3 request:', err);
      return;
    }
    // Access the result from the SOAP response
    console.log('SOAP3 Response:', result);
  });

 const args3 = {
  order: {
    "ID_order": 'PT131',
    "Name": "John Doe",
    "Address": "123 Main Street, Bangkok, 10330",
    "Tel": "081-234-5678",
    "Order_date": "2023-10-14",
    "Sent_date": "2023-10-21",
    "Total_Price": 10000.9,
    "Discount": 0.55,
    "Vat": 0.07,
    "Shipping_cost": 100.0,
    "Net_balance": 9730.0,
    "Order_status": "Pending",
    "details": [
      {
        "ID_product": 'PD10',
        "Product_name": "Product Name 1",
        "Product_description": "Description of Product 1",
        "Amount": 1,
        "Unit_Price": 49900.0,
        "Discount": 1000.0,
        "Total_price": 48900.0
      },
      {
        "ID_product": 'PD20',
        "Product_name": "Product Name 2",
        "Product_description": "Description of Product 2",
        "Amount": 2,
        "Unit_Price": 3500.0,
        "Discount": 500.0,
        "Total_price": 6500.0
      }
    ]
  }
};

client.order(args3, function (err, result) {
  if (err) {
    console.error('Error making SOAP4 request:', err);
    return;
  }
  // Access the result from the SOAP response
  console.log('SOAP4 Response:', result);
});


});
