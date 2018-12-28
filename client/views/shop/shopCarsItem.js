import plugins from "../../plugins";
import { Success, Failure, Loading } from "../../utils";
import { enquiryLayout } from "./shopCarsEmailLayout";

Template.shopCarsItem.onCreated(function() {
  this.loading = new ReactiveVar(false);
  this.error = new ReactiveVar(false);
  this.success = new ReactiveVar(false);
});

Template.shopCarsItem.helpers({
  relatedProducts: () => Cars.find().fetch(),
  loading: () => Template.instance().loading.get(),
  error: () => Template.instance().error.get(),
  success: () => Template.instance().success.get()
});

Template.shopCarsItem.events({
  "click #make_enquiry": function(event, template) {
    Loading(template);
    event.preventDefault();

    if (!Meteor.userId()) {
      Failure(template, "Please login to make enquiry");
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

    Meteor.call("InspectionRequests.insert", data, (err, res) => {
      if (err) {
        Failure(template, err.reason);
      } else {
        Success(template, "Your enquiry was received succesfully");
        setTimeout(() => {
          Router.go("/shop/cars");
        }, 4000);

        const subject = "Vehicle Inspection Enquiry";
        const to = Meteor.user().emails[0].address;
        const emailData = {
          first_name: Meteor.user().profile.first_name,
          vehicle_make: this.make,
          vehicle_model: this.model,
          vehicle_year: this.year,
          request_number: res
        };
        const text = enquiryLayout(emailData);

        Meteor.call("sendMail", to, subject, text, err => {
          if (err) {
            console.log(err.reason);
          } else {
            console.log("Email sent !");
          }
        });
      }
    });
  }
});

Template.shopCarsItem.onRendered(function() {
  plugins();
});
