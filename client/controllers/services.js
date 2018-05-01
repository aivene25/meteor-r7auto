Template.services.onCreated(function() {
  this.subscribe("services.all");
});

Template.services.helpers({
  service: () => {
    return Services.find({}, {}).fetch();
  }
});
