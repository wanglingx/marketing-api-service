<?php
    $client = new SoapClient("http://localhost:3000/ShippingCostService?wsdl");

    $data = array(
    'Shipping_Cost' => ''
    );

    // Encode the data as JSON
    $jsonData = json_encode($data);

    echo $client->shippingCost($jsonData);
?>