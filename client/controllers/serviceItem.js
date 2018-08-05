import plugins from "../plugins";

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

Template.serviceItem.events({
  "click #request_service": function(event) {
    event.preventDefault();
    if (Meteor.userId() == null) {
      let email = prompt("Please Enter your email address");
      if (email) {
        console.log("Email is", email);
        //send email to this user
      } else {
        alert("Invalid email address");
      }
    }else{
      alert("An email has been sent to you");
      // send emial to user like that
    }
  }
});

Template.serviceItem.onRendered(function() {
  plugins();
});
