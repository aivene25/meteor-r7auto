import plugins from "../plugins";
import states from "./../states.json";
var Ravepay = require("ravepay");

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
    let email = Meteor.user().emails[0].address;
    let phone = Meteor.user().profile.phone;
    let cart = Session.get("cartItems");
    let totalPrice = 0;
    cart.forEach(item => {
      let price = parseInt(item.product.Price);
      let quant = item.quantity;
      totalPrice += parseInt(price * quant);
    });

    if(!email){
      console.log("error in email");
      return;
    }
    if(!phone){
      console.log("error in phone");
      return;
    }
    if(!totalPrice){
      console.log("error in total price");
      return;
    }

    const API_publicKey = "FLWPUBK-bbc0e4adaa9cdcb7fb2e00ebd461533f-X";
    var x = getpaidSetup({
      PBFPubKey: API_publicKey,
      customer_email: email,
      amount: totalPrice,
      customer_phone: phone,
      currency: "NGN",
      payment_method: "both",
      txref: "rave-123456",
      meta: [
        {
          metaname: "flightID",
          metavalue: "AP1234"
        }
      ],
      onclose: function() {
        console.log("Transaction successsful");
      },
      callback: function(response) {
        var txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
        console.log("This is the response returned after a charge", response);
        if (
          response.tx.chargeResponseCode == "00" ||
          response.tx.chargeResponseCode == "0"
        ) {
          // redirect to a success page
          // insert data in orders
          // send email to everybody
          
        } else {
          // redirect to a failure page.
        }
        x.close(); // use this to close the modal immediately after payment.
      }
    });
  }
});
