Meteor.publish("posts.all", function() {
  return Posts.find({ show: true });
});

Meteor.publish("posts.one", function(_id) {
  return Posts.find({ _id, show: true });
});

Meteor.publish("services.all", function() {
  return Services.find();
});

Meteor.publish("car-services.all", function() {
  return CarServicing.find();
});

Meteor.publish("cars.all", function() {
  return Cars.find({ show: true });
});

Meteor.publish("parts.all", function() {
  return SpareParts.find({ show: true });
});

Meteor.publish("carMakes.all", function() {
  return CarMakes.find();
});

Meteor.publish("carCategories.all", function() {
  return CarCategories.find();
});
