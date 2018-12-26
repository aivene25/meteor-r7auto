Meteor.methods({
  "Orders.insert": function(data) {
    return Orders.insert(data);
  },
  "ServiceRequests.insert": function(data) {
    return ServiceRequests.insert(data);
  },
  "InspectionRequests.insert": function(data) {
    return InspectionRequests.insert(data);
  }
});
