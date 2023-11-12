const soap = require('soap');
// Create the SOAP client
const url = 'http://localhost:3000/ProductService?wsdl';

soap.createClient(url, function (err, client) {
  if (err) {
    console.error('Error creating SOAP client:', err);
    return;
    }

  const args1 = {
        ID_product: "PD14",
        Product_name: "iPhone 14 Pro Max",
        Product_price: 49900,
        Product_stock: 100,
        Exp_date: "2025-10-25",
        Product_status: "In stock"
    };
    client.newProduct(args1, function (err, result) {
        if (err) {
        console.error('Error making SOAP1 request:', err);
        return;
        }
        console.log('SOAP1 Response:', result);
    });
    
    const args2 = {
        ID_product: 'PD01',
        Product_price: 48000,
        Product_stock: 80
    };
    client.updateProduct(args2, function (err, result) {
        if (err) {
        console.error('Error making SOAP2 request:', err);
        return;
        }
        console.log('SOAP2 Response:', result);
    });
});