import plugins from "../plugins";
import states from "./../states.json";

Template.checkout.onCreated(function() {
  this.country = new ReactiveVar("Nigeria");
});

Template.checkout.onRendered(function() {
  plugins();
});

Template.checkout.helpers({
  country: function() {
    return states;
  },
  state: function() {
    args = Template.instance().country.get();
    let res = states.filter(function(val) {
      if (val.country === args) {
        return val;
      }
    });
    return res[0].states;
  },
  cartItems: function() {
    return Session.get("cartItems");
  },
  formatPrice: function(price) {
    let val = price.toLocaleString("en");
    return val;
  },
  totalPrice: () => {
    var item = Session.get("cartItems");
    var totalPrice = 0;
    if (item) {
      item.forEach(item => {
        let price = parseInt(item.product.Price);
        let quant = item.quantity;
        totalPrice += parseInt(price * quant);
      });
    }
    return totalPrice;
  }
});

Template.checkout.events({
  "change #country": function(event, template) {
    let country = event.currentTarget.value;
    template.country.set(country);
  },

  "click #paystack": function(event) {
    event.preventDefault();

    //carter for guest visitor

    if (!Meteor.userId()) {
      console.log("Please login to continue");
      alert("Please login to continue");
      window.scrollTo(0, 0);
      return;
    }

    let email = Meteor.user().emails[0].address;
    let phone = Meteor.user().profile.phone;
    let cart = Session.get("cartItems");

    let totalPrice = 0;
    cart.forEach(item => {
      let price = parseInt(item.product.Price);
      let quant = item.quantity;
      totalPrice += parseInt(price * quant);
    });

    if (!email) {
      console.log("error in email");
      return;
    }
    if (!phone) {
      console.log("error in phone");
      return;
    }
    if (!totalPrice) {
      console.log("error in total price");
      return;
    }

    data = {};
    data.status = "STATUS_PAYMENT_RECEIVED";
    data.order_number = 12345;
    data.delivery_method = "Courier";
    data.delivery_charge = 1000;
    data.delivery_date = new Date();
    data.pickup_location = "Null";
    data.payment_method = "Online";
    data.gateway_status = "APPROVED";
    data.gateway_transaction_ref = "PM32323232";
    data.date_added = new Date();
    data.products = Session.get("cartItems");

    Meteor.call("Orders.insert", data, (err, res) => {
      if (err) {
        console.log(err.reason);
      } else {
        // send email here and insert the order id
        console.log(res);
      }
    });

    return;

    var config = {
      key: "pk_test_076e4ef6af3de972b07418b5de432224369c29d3", // Replace with your public key
      email: email,
      amount: totalPrice * 100,
      firstname: Meteor.user().profile.first_name,
      lastname: Meteor.user().profile.last_name,
      ref: "PM" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function() {
        alert("Window closed.");
      },
      callback: function(response) {
        var message = "Payment complete! Reference: " + response.reference;
        alert(message);
        console.log(response);
        if (response.status === "success") {
          console.log("transcation successful");
          Meteor.call("Orders.insert", (err, res) => {
            if (err) {
              console.log(err.reason);
            } else {
              console.log("Tranccion log from method");
            }
          });
        } else {
          console.log("transcation error");
        }
      }
    };

    var paystackPopup = new Popup(config);
    paystackPopup.open();
  },

  "submit #login": function(event) {
    event.preventDefault();
    let email = event.target.email.value;
    let pass = event.target.pass.value;

    if (!email || !pass) {
      alert("Please fill in all fields");
      console.log("Please fill in the proper forms");
      return;
    }

    Meteor.loginWithPassword(email, pass, (err, res) => {
      if (err) {
        console.log(err.reason);
      } else {
        console.log(res);
        // scroll to bottom here, where the checkout button is
      }
    });
    // give appriporate fedback
  }
});
