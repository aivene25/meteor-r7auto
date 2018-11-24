import { adminEmailLayout, userEmailLayout } from "../../emailLayouts";
import { ArrayGenerator } from "../../utils";
Template.service_modal.onCreated(function() {
  this.subscribe("carMakes.all");
  this.loading = new ReactiveVar(false);
  this.validation_error = new ReactiveVar(false);
  this.validation_error_messages = new ReactiveVar([]);
  this.success = new ReactiveVar(false);
  this.carModels = new ReactiveVar([]);
});

Template.service_modal.helpers({
  isLoading: function() {
    const instance = Template.instance();
    return instance.loading.get();
  },
  validation_error: function() {
    const instance = Template.instance();
    return instance.validation_error.get();
  },
  validation_error_messages: function() {
    const instance = Template.instance();
    return instance.validation_error_messages.get();
  },
  success: function() {
    const instance = Template.instance();
    return instance.success.get();
  },
  carMakes: function() {
    const carMakes = CarMakes.find().fetch();
    return carMakes;
  },
  carModels: function() {
    const instance = Template.instance();
    return instance.carModels.get();
  },
  vehicleYears: function() {
    // returns an array of years from 1990 to present year
    const presentYear = new Date().getFullYear();
    const minimumYear = 1990;
    return ArrayGenerator(minimumYear, presentYear);
  }
});

Template.service_modal.events({
  "change select[name=vehicle_make]": function(event, template) {
    const carName = event.currentTarget.value;
    const carMake = CarMakes.findOne({ name: carName });
    if (carMake) {
      template.carModels.set(carMake.models);
    }
  },
  "submit #service-request-form": function(event, template) {
    event.preventDefault();
    template.loading.set(true);
    const vehicle_make = $("select[name=vehicle_make]").val();
    const vehicle_model = $("select[name=vehicle_model]").val();
    const vehicle_year = $("select[name=vehicle_year]").val() || "Any";
    const vehicle_notes = $("textarea[name=vehicle_notes]").val() || "None";
    const service_data = template.data.service;
    template.validation_error.set(false);
    template.validation_error_messages.set([]);

    if (!Meteor.userId()) {
      $("#car_servicing_modal").modal("hide");
      Meteor.setTimeout(() => {
        $("#login_modal").modal("show");
      }, 2000);
    }

    if (!vehicle_make) {
      template.validation_error.set(true);
      let errors = template.validation_error_messages.get();
      errors.push("Vehicle make is required");
      template.validation_error_messages.set(errors);
    }
    if (!vehicle_model) {
      template.validation_error.set(true);
      let errors = template.validation_error_messages.get();
      errors.push("Vehicle model is required");
      template.validation_error_messages.set(errors);
    }

    if (template.validation_error.get() == true) {
      template.loading.set(false);
      return;
    } else {
      const data = {
        first_name: Meteor.user().profile.first_name,
        last_name: Meteor.user().profile.last_name,
        email: Meteor.user().emails[0].address,
        phone: Meteor.user().profile.phone,
        service_id: service_data._id,
        service_title:
          service_data.title + " " + "Car Service" || service_data.service,
        // add service type here
        vehicle_make,
        vehicle_model,
        vehicle_year,
        vehicle_notes
      };
    
      const res = ServiceRequests.insert(data);
      console.log(res);

      const subject = "Service Request";

      Meteor.call(
        "sendMail",
        Meteor.user().emails[0].address,
        subject,
        userEmailLayout(data),
        err => {
          if (err) {
            console.log(err.reason);
            template.loading.set(false);
            template.validation_error.set(true);
            let errors = template.validation_error_messages.get();
            errors.push(err.reason);
            template.validation_error_messages.set(errors);
          } else {
            $("select[name=vehicle_make]").val("");
            $("select[name=vehicle_model]").val("");
            $("select[name=vehicle_year]").val("");
            $("textarea[name=vehicle_notes]").val("");

            template.loading.set(false);
            template.success.set(true);
            Meteor.setTimeout(() => {
              $("#service_modal").modal("hide");
              template.validation_error.set(false);
              template.validation_error_messages.set([]);
              template.success.set(false);
            }, 3000);
            console.log("Email sent !");
          }
        }
      );

      const adminEmail = "info.r7auto@gmail.com";
      const adminEmailSubject = "Service Request";
      Meteor.call(
        "sendMail",
        adminEmail,
        adminEmailSubject,
        adminEmailLayout(data)
      );
    }
  }
});
