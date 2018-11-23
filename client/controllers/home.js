import plugins from "../plugins";

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
  services: function() {
    return Session.get("services");
  },
  parts: function() {
    return Session.get("parts");
  },
  cars: function() {
    return Session.get("cars");
  }
});

Template.home.events({
  "click #add-to-cart": function(event) {
    event.preventDefault();
    let product = this;
    let cartItems = Session.get("cartItems") || [];
    let contains = false;

    if (cartItems.length > 0) {
      cartItems.forEach(item => {
        if (product._id == item.product_id) {
          item.quantity = parseInt(item.quantity) + 1;
          contains = true;
        }
      });
      if (contains == false) {
        let data = { 
          product_id: product._id,
          title: product.title,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
          quantity: 1 
        };
        cartItems.push(data);
      }
    } else {
      let data = { 
        product_id: product._id,
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        quantity: 1  
      };
      cartItems.push(data);
    }
    alert("Item added to cart");
    Session.setPersistent("cartItems", cartItems);
  }
});

Template.home.onRendered(function() {
  Meteor.setTimeout(() => {
    plugins();
  }, 500);
});
