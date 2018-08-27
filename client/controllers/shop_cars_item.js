import plugins from "../plugins";


Template.shopCarsItem.helpers({
  relatedProducts: function() {
    return Cars.find().fetch();
  },
  formatPrice(price) {
    let val = price.toLocaleString("en");
    return val;
  }
});

Template.shopCarsItem.events({
  "click #make_enquiry": function(event, template) {
    event.preventDefault();
    if (!Meteor.userId()) {
      alert("Please login to make enquiry");
      Router.go("/account");
    }
    let data = {
      first_name: Meteor.user().profile.first_name,
      last_name: Meteor.user().profile.last_name,
      email: Meteor.user().emails[0].address,
      phone: Meteor.user().profile.phone,
      vehicle_id: Router.current().params._id,
      vehicle_make: this.make,
      vehicle_model: this.model
    };
    let subject ="Vehicle Inspection Enquiry";

    Meteor.call("InspectionRequests.insert", data, (err, res) => {
      if (err) {
        console.log(err.reason);
      } else {
        alert("Your enquiry was received succesfully");
        let text = `Dear ${
          Meteor.user().profile.first_name
        }, your enquiry has been received and is being processesd, </br> Your request number is ${res}. </br> Vehicle requested is ${this.make},  ${this.model}. `;
        Router.go("/shop/cars");

        Meteor.call(
          "sendMail",
          Meteor.user().emails[0].address,
          subject,
          text,
          (err, res) => {
            if (err) {
              console.log(err.reason);
            } else {
              alert("Email sent !");
            }
          }
        );
      }
    });
  }
});

Template.shopCarsItem.onRendered(function() {
  plugins();
});
