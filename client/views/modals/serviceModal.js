import { adminEmailLayout, userEmailLayout } from "../../emailLayouts";

Template.service_modal.onCreated(function() {
  this.loading = new ReactiveVar(false);
  this.validation_error = new ReactiveVar(false);
  this.validation_error_messages = new ReactiveVar([]);
  this.success = new ReactiveVar(false);
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
  }
});

Template.service_modal.events({
  "submit #service-request-form": function(event, template) {
    event.preventDefault();
    template.loading.set(true);
    const vehicle_make = $("select[name=vehicle_make]").val();
    const vehicle_model = $("input[name=vehicle_model]").val();
    const vehicle_year = $("select[name=vehicle_year]").val() || "Unknown";
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
        service_title: service_data.title+"Car Service" || service_data.service,
        // service type too
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
        (err, res) => {
          if (err) {
            console.log(err.reason);
            template.loading.set(false);
            template.validation_error.set(true);
            let errors = template.validation_error_messages.get();
            errors.push(err.reason);
            template.validation_error_messages.set(errors);
          } else {
            $("select[name=vehicle_make]").val("");
            $("input[name=vehicle_model]").val("");
            $("select[name=vehicle_year]").val("");
            $("textarea[name=vehicle_notes]").val("");

            template.loading.set(false);
            template.success.set(true);
            Meteor.setTimeout(() => {
              $("#service_modal").modal("hide");
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
