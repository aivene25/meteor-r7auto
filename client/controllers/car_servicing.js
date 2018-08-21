import plugins from "../plugins";

Template.car_servicing.onCreated(function() {
  this.subscribe("services.all");
});

Template.car_servicing.helpers({
  
});

Template.car_servicing.onRendered(function() {
  plugins();
});
