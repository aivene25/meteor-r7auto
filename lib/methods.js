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
  },
  "ServiceRequests.insert": function(data) {
    return ServiceRequests.insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      service_id: data.service_id,
      service_title: data.service_title,
      vehicle_make: data.vehicle_make,
      vehicle_model: data.vehicle_model,
      vehicle_year: data.vehicle_year,
      vehicle_notes: data.vehicle_notes
    });
  },
  "InspectionRequests.insert": function(data) {
    return InspectionRequests.insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      vehicle_id: data.vehicle_id,
      vehicle_make: data.vehicle_make,
      vehicle_model: data.vehicle_model
    });
  }
});
