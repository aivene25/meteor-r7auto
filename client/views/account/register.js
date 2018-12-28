import plugins from "../../plugins";
import { Loading, Success, Failure, validateEmail } from "../../utils";

Template.register.onCreated(function() {
  this.loading = new ReactiveVar(false);
  this.error = new ReactiveVar(false);
  this.success = new ReactiveVar(false);
});

Template.register.helpers({
  loading: () => Template.instance().loading.get(),
  error: () => Template.instance().error.get(),
  success: () => Template.instance().success.get()
});

Template.register.events({
  "submit #register": function(event, template) {
    event.preventDefault();
    Loading(template);

    const email = event.target.email.value;
    const password = event.target.pass.value;
    const first_name = event.target.fname.value;
    const last_name = event.target.lname.value;
    const phone = event.target.phone.value;
    const confirm_password = event.target.con_pass.value;

    if (!email || !validateEmail(email)) Failure(template, "Invalid email");

    if (!password) Failure(template, "Password is required");

    if (!first_name) Failure(template, "First Name is required");

    if (!last_name) Failure(template, "Last Name is required");

    if (!phone) Failure(template, "Phone is required");

    if (password !== confirm_password)
      Failure(template, "Passwords do not match");

    data = { email, password };
    data.profile = { first_name, last_name, phone };

    Accounts.createUser(data, err => {
      if (err) {
        Failure(template, err.reason);
      } else {
        Success(template, "Account created successfully");
      }
    });
  }
});

Template.register.onRendered(function() {
  plugins();
});
