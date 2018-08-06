import plugins from '../plugins';

Template.home.onCreated(function() {
  let sub = this.subscribe("services.all");
  let blog = this.subscribe("posts.all");
  let parts = this.subscribe("parts.all");
  let cars = this.subscribe("cars.all");
  this.autorun(function() {
    if (sub.ready() == true) {
      let res = Services.find({}, {}).fetch();
      Session.setPersistent("services", res);
    }
    if (blog.ready() == true) {
      let res = Posts.find({}, {}).fetch();
      Session.setPersistent("posts", res);
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
  posts: function() {
    return Session.get("posts");
  },
  parts: function() {
    return Session.get("parts");
  },
  cars: function() {
    return Session.get("cars");
  }
});

Template.home.events({
  "click .add-to-cart": function(event, template) {
    event.preventDefault();
    let id = event.currentTarget.id;
    let product = SpareParts.findOne({ _id: id }, {});
    console.log(product);
    let cartItems = Session.get("cartItems") || [];
    let contains = false;

    if (cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        if (id == item.productId) {
          item.quantity = item.quantity + 1;
          contains = true;
        }
      });
      if (contains == false) {
        let data = { productId: id, product: product, quantity: 1 };
        cartItems.push(data);
      }
    } else {
      let data = { productId: id, product: product, quantity: 1 };
      cartItems.push(data);
    }
    alert("Item added to cart");
    Session.setPersistent("cartItems", cartItems);
  }
});

Template.home.onRendered( function(){
  Meteor.setTimeout( ()=>{
    plugins()
  }, 500);
})
