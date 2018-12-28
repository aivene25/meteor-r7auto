Template.register_modal.onCreated(function() {
  this.loading = new ReactiveVar(false);
  this.validation_error = new ReactiveVar(false);
  this.validation_error_messages = new ReactiveVar([]);
  this.success = new ReactiveVar(false);
});

Template.register_modal.helpers({
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

Template.register_modal.events({
  "submit #register_modal_form": function(event, template) {
    event.preventDefault();
    template.loading.set(true);
    const email = $("input[name=register_email]").val();
    const password = $("input[name=register_password]").val();
    const first_name = $("input[name=register_first_name]").val();
    const last_name = $("input[name=register_last_name]").val();
    const phone = $("input[name=register_phone]").val();
    const confirm_password = $("input[name=register_confirm_password]").val();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    template.validation_error.set(false);
    template.validation_error_messages.set([]);

    if (!email) {
      template.validation_error.set(true);
      let errors = template.validation_error_messages.get();
      errors.push("Email is required");
      template.validation_error_messages.set(errors);
    }
    if (email) {
      const validEmail = emailRegex.test(email);
      if (!validEmail) {
        template.validation_error.set(true);
        let errors = template.validation_error_messages.get();
        errors.push("Please provide a valid email");
        template.validation_error_messages.set(errors);
      }
    }
    if (!password) {
      template.validation_error.set(true);
      let errors = template.validation_error_messages.get();
      errors.push("Password is required");
      template.validation_error_messages.set(errors);
    }
    if (!first_name) {
      template.validation_error.set(true);
      let errors = template.validation_error_messages.get();
      errors.push("First Name is required");
      template.validation_error_messages.set(errors);
    }

    if (!last_name) {
      template.validation_error.set(true);
      let errors = template.validation_error_messages.get();
      errors.push("Last Name is required");
      template.validation_error_messages.set(errors);
    }

    if (!phone) {
      template.validation_error.set(true);
      let errors = template.validation_error_messages.get();
      errors.push("Phone number is required");
      template.validation_error_messages.set(errors);
    }

    if (password !== confirm_password) {
      template.validation_error.set(true);
      let errors = template.validation_error_messages.get();
      errors.push("Passwords do not match");
      template.validation_error_messages.set(errors);
    }

    if (template.validation_error.get() == true) {
      template.loading.set(false);
      return;
    } else {
      data = { email, password };
      data.profile = { first_name, last_name, phone };

      Accounts.createUser(data, err => {
        if (err) {
          console.log(err.reason);
          template.loading.set(false);
          template.validation_error.set(true);
          let errors = template.validation_error_messages.get();
          errors.push(err.reason);
          template.validation_error_messages.set(errors);
        } else {
          template.success.set(true);
          template.loading.set(false);
          Meteor.setTimeout(() => {
            $("#register_modal").modal("hide");
            template.validation_error.set(false);
            template.validation_error_messages.set([]);
            template.success.set(false);
          }, 2000);
          const currentUrl = Router.current().url;
          if (currentUrl.includes("servic")) {
            Meteor.setTimeout(() => {
              $("#service_modal").modal("show");
            }, 2600);
          }
        }
      });
    }
  },
  "click #show_login": function(event, template) {
    $("#register_modal").modal("hide");
    Meteor.setTimeout(() => {
      $("#login_modal").modal("show");
    }, 1000);
  }
});
