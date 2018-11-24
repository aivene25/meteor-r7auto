Template.login_modal.onCreated(function() {
  this.loading = new ReactiveVar(false);
  this.validation_error = new ReactiveVar(false);
  this.validation_error_messages = new ReactiveVar([]);
  this.success = new ReactiveVar(false);
});

Template.login_modal.helpers({
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
    console.log(instance.validation_error_messages.get());
    return instance.validation_error_messages.get();
  },
  success: function() {
    const instance = Template.instance();
    return instance.success.get();
  }
});

Template.login_modal.events({
  "submit #login_modal_form": function(event, template) {
    event.preventDefault();
    template.loading.set(true);
    const email = $("input[name=login_email]").val();
    const password = $("input[name=login_password]").val();
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
    if (template.validation_error.get() == true) {
      template.loading.set(false);
      return;
    } else {
      Meteor.loginWithPassword(email, password, (err, res) => {
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
            $("#login_modal").modal("hide");
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
  "click #show_register": function(event, template) {
    $("#login_modal").modal("hide");
    Meteor.setTimeout(() => {
      $("#register_modal").modal("show");
    }, 1000);
  }
});
