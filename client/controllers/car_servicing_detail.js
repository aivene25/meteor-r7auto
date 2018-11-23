import plugins from "../plugins";

Template.car_servicing_detail.onCreated(function() {
  const sub = this.subscribe("car-services.all");
  this.loading = new ReactiveVar(false);
  this.validation_error = new ReactiveVar(false);
  this.validation_error_messages = new ReactiveVar([]);
  this.success = new ReactiveVar(false);
  this.service = new ReactiveVar();
  this.autorun(() => {
    if (sub.ready() === true) {
      let query = Router.current().params._id;
      let new_query = query.charAt(0).toUpperCase() + query.slice(1);
      let res = CarServicing.findOne({ title: new_query }, {});
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

Template.car_servicing_detail.onRendered(function() {
  plugins();
});

Template.car_servicing_detail.events({
  "click #request-service": function(event) {
    event.preventDefault();
    if (Meteor.userId()) {
      $("#car_servicing_modal").modal("show");
    } else {
      $("#login_modal").modal("show");
    }
  },
  "submit #service-request-form": function(event, template) {
    event.preventDefault();
    template.loading.set(true);
    const vehicle_make = $("select[name=vehicle_make]").val();
    const vehicle_model = $("input[name=vehicle_model]").val();
    const vehicle_year = $("input[name=vehicle_year]").val() || "Unknown";
    const vehicle_notes = $("input[name=vehicle_notes]").val() || "None";
    const title = template.service.get().title;
    const subject = "Service Request Received Successfully";

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
      let data = {
        first_name: Meteor.user().profile.first_name,
        last_name: Meteor.user().profile.last_name,
        email: Meteor.user().emails[0].address,
        phone: Meteor.user().profile.phone,
        service_id: template.service.get()._id,
        service_title: title,
        vehicle_make,
        vehicle_model,
        vehicle_year,
        vehicle_notes
      };
      // insert into db and send emails
      const res = ServiceRequests.insert({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        service_id: data.service_id,
        service_title: data.service_title,
        vehicle_make: data.vehicle_make,
        vehicle_model: data.vehicle_model,
        vehicle_year: data.vehicle_year,
        vehicle_notes: data.vehicle_notes
      });
      console.log(res);
      const emailTextHead =
        '<style type="text/css"> @font-face{font-family: Futura; src: url(http://artoja-stage.herokuapp.com/fonts/futura/FTR45_C.ttf); font-weight: 400;}@font-face{font-family: Futura; src: url(http://artoja-stage.herokuapp.com/fonts/futura/futur.ttf); font-weight: 400; font-style: italic;}@font-face{font-family: Futura; src: url(http://artoja-stage.herokuapp.com/fonts/futura/FUTURA-N.ttf); font-weight: 600;}body{font-family: "Futura", Sans-Serif;}a{color: #1c63b8;}#prodTable{width: 100%;}#prodTable td p{line-height: 1.5;}#prodTable td img{width: 145px; margin: 5% auto; vertical-align: super;}</style><div style="padding:2% 5%"> <img src="http://www.r7auto.com/assets/img/r7auto-logo.png" style="display:block;width:120px;max-width:85%;margin:auto auto 5%;"/> <div style="border-top:5px solid #1c63b8;padding:2% 0;"> <h1 style="color:#1c63b8;font-size:33px;">Service Reservation</h1> <br/><!-- <h4 style="margin-top:0px"> ARTOJA is an online marketplace and creative production company for contemporary art and design in Africa. We are here to help with your contemporary art needs - whether you are an experienced collector, a first time buyer or a corporate client. </h4> --> <h4>Hi <strong>first_name</strong>, thank you for reaching out to us</h4> <h4>A member of our team would reach out to you as soon as possible</h4> <h3 style="margin-top:50px; text-decoration: underline">Your request details</h3>';

      const emailTextFoot =
        '<div style="border-top:3px solid #000;padding:2% 0;"> <p>CUSTOMER SERVICE</p><p> We would love to hear from you! Please email us at <a href="mailto:info.r7auto@gmail.com">info.r7auto@gmail.com</a> with any other questions or call us at <a href="tel:+2349099828744">+234 909 982 8744</a></p></p></div></div>';

      const emailTextBody =
        "<p >Service Type:<strong>" +
        data.service_title +
        "</strong></p><p>Vehicle Make : <strong>" +
        data.vehicle_make +
        "</strong></p><p>Vehicle Model : <strong>" +
        data.vehicle_model +
        "</strong></p><p>Vehicle Year : <strong>" +
        data.vehicle_year +
        "</strong></p><p>Extra notes : <strong>" +
        data.vehicle_notes +
        "</strong></p></div>";

      const emailText = emailTextHead + emailTextBody + emailTextFoot;
      Meteor.call(
        "sendMail",
        Meteor.user().emails[0].address,
        subject,
        emailText,
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
            $("input[name=vehicle_mode]").val("");
            $("input[name=vehicle_year]").val("");
            $("input[name=vehicle_notes]").val("");

            template.loading.set(false);
            template.success.set(true);
            Meteor.setTimeout(() => {
              $("#car_servicing_modal").modal("hide");
            }, 3000);
            console.log("Email sent !");
          }
        }
      );
    }
  }
});
