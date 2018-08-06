Router.configure({
  layoutTemplate: "main"
});

Router.route("/", {
  name: "home",
  template: "home"
});

Router.route("/account", {
  name: "register",
  template: "register"
});
Router.route("/blog", {
  name: "blog",
  template: "blog"
});
Router.route("/about", {
  name: "about",
  template: "about"
});
Router.route("/contact", {
  name: "contact",
  template: "contact"
});

Router.route("/checkout", {
  name: "checkout",
  template: "checkout"
});
Router.route("/cart/view", {
  name: "cartView",
  template: "cartView"
});

Router.route("/services", {
  name: "services",
  template: "services"
});
Router.route("/service/:id", {
  name: "serviceItem",
  template: "serviceItem"
});

Router.route("/appointments", {
  name: "appointments",
  template: "appointments"
});

Router.route("/shop/cars", {
  name: "shopCars",
  template: "shopCars",
  layoutTemplate: "withSidebar"
});

Router.route("/shop/parts", {
  name: "shopParts",
  template: "shopParts",
  layoutTemplate: "withSidebar"
});
Router.route("/shop/parts/:_id", {
  name: "shopPartsItem",
  template: "shopPartsItem",
  layoutTemplate: "withSidebar",
  data: function() {
    return SpareParts.findOne({ _id: this.params._id });
  },
  waitOn: function() {
    return this.subscribe("parts.all");
  }
});

Router.route("/shop/cars/:_id", {
  name: "shopCarsItem",
  template: "shopCarsItem",
  layoutTemplate: "withSidebar",
  data: function() {
    return Cars.findOne({ _id: this.params._id });
  },
  waitOn: function() {
    return this.subscribe("cars.all");
  }
});
