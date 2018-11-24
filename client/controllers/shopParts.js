//#1c63b8

import plugins from "../plugins";

Template.shopParts.onCreated(function() {
  this.subscribe("parts.all");
});

Template.shopParts.helpers({
  data: () => {
    return SpareParts.find({}, {}).fetch();
  }
});

Template.shopParts.events({
  "click #add-to-cart": (event, template) => {
    event.preventDefault();
    console.log(template.data);
    return;
    let cartItems = Session.get("cartItems") || [];
    let contains = false;
    if (cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        if (template.data._id == item.productId) {
          item.quantity = item.quantity + 1;
          contains = true;
        }
      });
      if (contains == false) {
        let data = {
          productId: template.data._id,
          product: template.data,
          quantity: 1
        };
        cartItems.push(data);
      }
    } else {
      let data = {
        productId: template.data._id,
        product: template.data,
        quantity: 1
      };
      cartItems.push(data);
    }
    alert("Item added to cart");
    Session.setPersistent("cartItems", cartItems);
  }
});

Template.shopParts.onRendered(function() {
  plugins();
});
