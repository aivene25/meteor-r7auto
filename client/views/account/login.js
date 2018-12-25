import plugins from "../../plugins";
import { Loading, Success, Failure, validateEmail } from "../../utils";

Template.login.onCreated(function() {
  this.loading = new ReactiveVar(false);
  this.error = new ReactiveVar(false);
  this.success = new ReactiveVar(false);
});

Template.login.helpers({
  loading: () => Template.instance().loading.get(),
  error: () => Template.instance().error.get(),
  success: () => Template.instance().success.get()
});

Template.login.events({
  "submit #login": function(event, template) {
    event.preventDefault();
    Loading(template);

    const email = event.target.email.value;
    const password = event.target.pass.value;

    if (!email || !validateEmail(email)) Failure(template, "Invalid email");

    if (!password) Failure(template, "Password is required");

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        Failure(template, err.reason);
      } else {
        Success(template, "Login successful");
        setTimeout(() => {
          Router.go("home");
        }, 2000);
      }
    });
  }
});

Template.login.onRendered(function() {
  plugins();
});
