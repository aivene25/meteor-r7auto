import plugins from "../plugins";

Template.account.onCreated(function() {
  this.loading = new ReactiveVar(false);
  this.validation_error = new ReactiveVar(false);
  this.validation_error_messages = new ReactiveVar([]);
  this.success = new ReactiveVar(false);
});

Template.account.helpers({
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

Template.account.events({
  "submit #register": function(event, template) {
    event.preventDefault();
    template.loading.set(true);
    const email = event.target.email.value;
    const password = event.target.pass.value;
    const first_name = event.target.fname.value;
    const last_name = event.target.lname.value;
    const phone = event.target.phone.value;
    const confirm_password = event.target.con_pass.value;

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
            template.validation_error.set(false);
            template.validation_error_messages.set([]);
            template.success.set(false);
          }, 2000);
        }
      });
    }
  },

  "submit #login": function(event, template) {
    event.preventDefault();
    template.loading.set(true);
    const email = event.target.email.value;
    const password = event.target.pass.value;

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
      Meteor.loginWithPassword(email, password, err => {
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
            template.validation_error.set(false);
            template.validation_error_messages.set([]);
            template.success.set(false);
          }, 2000);
        }
      });
    }
  },
  "click .accordion-item": function(event, template) {
    template.validation_error.set(false);
    template.validation_error_messages.set([]);
    template.success.set(false);
  }
});

Template.account.onRendered(function() {
  plugins();
});
