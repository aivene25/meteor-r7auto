import plugins from "../plugins";

Template.car_servicing_detail.onCreated(function() {
  const sub = this.subscribe("car-services.all");
  this.service = new ReactiveVar();
  this.autorun(() => {
    if (sub.ready() === true) {
      const query = Router.current().params._id;
      let new_query = query.charAt(0).toUpperCase() + query.slice(1);
      let res = CarServicing.findOne({ title: new_query });
      this.service.set(res);
    }
  });
});

Template.car_servicing_detail.helpers({
  data: () => {
    const data = Template.instance().service.get();
    if (data) {
      return data;
    } else {
      return false;
    }
  },
  service_data: function() {
    const instance = Template.instance();
    const data = instance.service.get();
    return instance.service.get();
  }
});

Template.car_servicing_detail.events({
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

Template.car_servicing_detail.onRendered(function() {
  plugins();
});
