
import plugins from '../plugins';

Template.serviceItem.onCreated(function() {
  let sub = this.subscribe("services.all");
  this.autorun(function() {
    if (sub.ready() == true) {
      let res = Services.find({}, {}).fetch();
      Session.setPersistent("services", res);
    }
  });
});

Template.serviceItem.helpers({
  data: () => {
    return Services.findOne({ _id: Router.current().params.id });
  },
  services: function() {
    let services = Session.get("services");
    console.log(services, "are");
    return services;
  }
});

Template.serviceItem.onRendered(function() {
  plugins();
});
