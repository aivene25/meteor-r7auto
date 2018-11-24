import plugins from "../plugins";

Template.serviceItem.onCreated(function() {
  const sub = this.subscribe("services.all");
  const id = Router.current().params._id;
  this.service = new ReactiveVar();
  this.autorun(() => {
    if (sub.ready() == true) {
      const res = Services.findOne({ _id: id });
      this.service.set(res);
    }
  });
});

Template.serviceItem.helpers({
  data: () => {
    const instance = Template.instance();
    return instance.service.get();
  },
  services: function() {
    return Session.get("services");
  },
  service_data: function() {
    const instance = Template.instance();
    return instance.service.get();
  }
});

Template.serviceItem.events({
  "click #request-service": function(event, template) {
    event.preventDefault();
    if (Meteor.userId()) {
      const res = template.service.get();
      template.service.set(res);
      $("#service_modal").modal("show");
    } else {
      $("#login_modal").modal("show");
    }
  }
});

Template.serviceItem.onRendered(function() {
  plugins();
});
