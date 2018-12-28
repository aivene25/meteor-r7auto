import plugins from "../plugins";
import Cart from "./shop/Cart";

Template.home.onCreated(function() {
  let sub = this.subscribe("services.all");
  let parts = this.subscribe("parts.all");
  let cars = this.subscribe("cars.all");
  this.autorun(function() {
    if (sub.ready() == true) {
      let res = Services.find({}, {}).fetch();
      Session.setPersistent("services", res);
    }
    if (parts.ready() == true) {
      let res = SpareParts.find({}, {}).fetch();
      Session.setPersistent("parts", res);
    }
    if (cars.ready() == true) {
      let res = Cars.find({}, {}).fetch();
      Session.setPersistent("cars", res);
    }
  });
});

Template.home.helpers({
  services: () => Session.get("services"),
  parts: () => Session.get("parts"),
  cars: () => Session.get("cars")
});

Template.home.events({
  "click #add-to-cart": function(event) {
    event.preventDefault();
    const product = this;
    try {
      const newCart = new Cart(product).addToCart(1);
    } catch (ex) {
      console.log(ex);
    }
  }
});

Template.home.onRendered(function() {
  Meteor.setTimeout(() => {
    plugins();
  }, 500);
});
