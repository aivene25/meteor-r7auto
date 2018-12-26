import plugins from "../../plugins";
import states from "../../states.json";
import Cart from "../shop/Cart";
import { Failure, Loading, Success } from "../../utils";

Template.checkout.onCreated(function() {
  this.country = new ReactiveVar("Nigeria");
  this.loading = new ReactiveVar(false);
  this.error = new ReactiveVar(false);
  this.success = new ReactiveVar(false);
});

Template.checkout.helpers({
  loading: () => Template.instance().loading.get(),
  error: () => Template.instance().error.get(),
  success: () => Template.instance().success.get(),
  state: function() {
    const res = states.filter(val => {
      if (val.country === "Nigeria") {
        return val;
      }
    });
    return res[0].states;
  },
  cartItems: () => Cart.cartItems(),
  totalPrice: () => Cart.cartTotal()
});

Template.checkout.events({
  "click #paystack": function(event, template) {
    event.preventDefault();
    Loading(template);

    if (!Meteor.userId()) {
      Failure(template, "Please Login to continue");
    }

    const email = Meteor.user().emails[0].address;
    const { phone, first_name, last_name } = Meteor.user().profile;
    const cartItems = Cart.cartItems();
    const totalPrice = Cart.cartTotal();
    const subject = "Order received successfully";
    let delivery_date = new Date();
    delivery_date.setDate(delivery_date.getDate() + 3);

    if (!email) Failure(template, "No email provided");

    if (!phone) Failure(template, "No phone provided");

    if (!totalPrice) Failure(template, "No price provided");

    //key- Replace with your public key
    //ref - generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    //label - "Optional string that replaces customer email"

    const config = {
      key: "pk_test_076e4ef6af3de972b07418b5de432224369c29d3",
      amount: totalPrice * 100,
      first_name,
      last_name,
      email,
      ref: "PM" + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: phone
          },
          {
            display_name: "First Name",
            variable_name: "first_name",
            value: first_name
          },
          {
            display_name: "Last Name",
            variable_name: "last_name",
            value: last_name
          }
        ]
      },
      onClose: function() {
        alert("Window closed.");
      },
      callback: function(response) {
        const message = "Payment complete! Reference: " + response.reference;
        alert(message);
        console.log(response);
        if (response.status === "success") {
          data = {};
          data.status = "STATUS_PAYMENT_RECEIVED";
          data.delivery_method = "Courier";
          data.delivery_charge = 1000;
          data.delivery_date = delivery_date;
          data.pickup_location = "Null";
          data.payment_method = "Online";
          data.gateway_status = "APPROVED";
          data.gateway_transaction_ref = response.ref;
          data.date_added = new Date();
          data.products = cartItems;

          Meteor.call("Orders.insert", data, (err, res) => {
            if (err) {
              console.log(err.reason);
              alert(err.reason);
            } else {
              let text = `Dear ${
                Meteor.user().profile.first_name
              }, Your order was received successfully, Order number is - ${res} . Transaction reference - ${
                data.gateway_transaction_ref
              }. Expected delivery date is- ${data.delivery_date}`;

              alert("Order received succsesfully  " + res);
              Session.clear("cartItems");

              Meteor.call("sendMail", email, subject, text, (err, res) => {
                if (err) {
                  console.log("Error in sending email ", err.reason);
                } else {
                  console.log("Mail sent successfully");
                  alert("Mail sent successfully");
                }
              });
              // send user to the account page let him see his order
              Router.go("/");
            }
          });
        } else {
          console.log("transcation error");
        }
      }
    };

    const paystackPopup = PaystackPop.setup(config);
    paystackPopup.openIframe();
  },

  "submit #login": function(event, template) {
    event.preventDefault();
    Loading(template);
    const email = event.target.email.value;
    const password = event.target.pass.value;

    if (!email) Failure(template, "Email required");
    if (!password) Failure(template, "Password required");

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        Failure(template, err.reason);
      } else {
        Success(template, "Login successful");
      }
    });
  }
});

Template.checkout.onRendered(function() {
  plugins();
});
