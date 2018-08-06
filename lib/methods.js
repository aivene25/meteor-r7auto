Meteor.methods({
  "Orders.insert": function(data) {
    // check data values
    return Orders.insert({
      status: data.status,
      delivery_method: data.delivery_method,
      delivery_charge: data.delivery_charge,
      delivery_date: data.delivery_date,
      pickup_location: data.pickup_location,
      payment_method: data.payment_method,
      gateway_status: data.gateway_status,
      gateway_transaction_ref: data.gateway_transaction_ref,
      data_added: data.date_added,
      products: data.products
    });
  }
});
