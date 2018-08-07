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
    return Services.findOne({ _id: Router.current().params._id });
  },
  services: function() {
    return Session.get("services");
  }
});

Template.serviceItem.events({
  "click #request-service": function(event) {
    event.preventDefault();
    if (Meteor.userId()) {
      // bring up modal;
      $("#request-service-modal").modal("show");
    } else {
      alert("Please login to make a service request");
      Router.go("/account");
    }
  },
  "submit #service-request-form": function(event) {
    event.preventDefault();

    let make = event.target.vehicle_make.value;
    let model = event.target.vehicle_model.value;
    let year = event.target.vehicle_year.value;
    let notes = event.target.notes.value;
    let title =
      Services.findOne({ _id: Router.current().params._id }).title || "Any";
    
    let subject = "Service Request Received Successfully";

    if (!model || !make) {
      alert("Please fill in all fields");
      return;
    }
    if (!Meteor.userId()) {
      alert("Please Login to make service request");
      Router.go("/account");
    }

    let data = {
      first_name: Meteor.user().profile.first_name,
      last_name: Meteor.user().profile.last_name,
      email: Meteor.user().emails[0].address,
      phone: Meteor.user().profile.phone,
      service_id: Router.current().params.id,
      service_title: title,
      vehicle_make: make,
      vehicle_model: model,
      vehicle_year: year,
      notes: notes
    };

    // insert into db and send emails
    Meteor.call("ServiceRequests.insert", data, (err, res) => {
      if (err) {
        console.log(err.reason);
      } else {
        alert("Your request was received succesfully");
        let text = `Dear ${
          Meteor.user().profile.first_name
        }, your request has been received and is being processesd, </br> Your request number is ${res}. </br> Service requested is ${title} for a ${vehicle_make}  ${vehicle_model}. `;

        Meteor.call(
          "sendMail",
          Meteor.user().emails[0].address,
          subject,
          text,
          (err, res) => {
            if (err) {
              console.log(err.reason);
            } else {
              $("#request-service-modal").modal("hide");
              event.target.vehicle_model.value = "";
              event.target.notes.value = "";
              alert("Email sent !");
            }
          }
        );
      }
    });
  }
});

Template.serviceItem.onRendered(function() {
  plugins();
});
