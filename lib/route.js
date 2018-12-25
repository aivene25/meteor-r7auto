Router.configure({
  layoutTemplate: "main"
});

LoadController = RouteController.extend({
  waitOn: function() {
    $(".overlay").css("display", "flex");
    Meteor.setTimeout(function() {
      $(".overlay").css("display", "none");
    }, 2000);
  },
  action: function() {
    this.render();
  }
});

Router.route("/", {
  name: "home",
  template: "home",
  controller: LoadController
});

Router.route("/login", {
  name: "login",
  template: "login",
  controller: LoadController
});

Router.route("/register", {
  name: "register",
  template: "register",
  controller: LoadController
});

Router.route("/car-servicing", {
  name: "car_servicing",
  template: "car_servicing",
  controller: LoadController
});

Router.route("/car-servicing/:_id", {
  name: "car_servicing_detail",
  template: "car_servicing_detail",
  controller: LoadController
});

Router.route("/account", {
  name: "account",
  template: "account",
  controller: LoadController
});
Router.route("/blog", {
  name: "blog",
  template: "blog",
  controller: LoadController
});
Router.route("/about", {
  name: "about",
  template: "about",
  controller: LoadController
});
Router.route("/contact", {
  name: "contact",
  template: "contact",
  controller: LoadController
});

Router.route("/checkout", {
  name: "checkout",
  template: "checkout",
  controller: LoadController
});
Router.route("/cart/view", {
  name: "cartView",
  template: "cartView",
  controller: LoadController
});

Router.route("/services", {
  name: "services",
  template: "services",
  controller: LoadController
});
Router.route("/service/:_id", {
  name: "serviceItem",
  template: "serviceItem",
  controller: LoadController
});

Router.route("/appointments", {
  name: "appointments",
  template: "appointments",
  controller: LoadController
});

Router.route("/shop/cars", {
  name: "shopCars",
  template: "shopCars",
  layoutTemplate: "withSidebar",
  controller: LoadController
});

Router.route("/shop/parts", {
  name: "shopParts",
  template: "shopParts",
  layoutTemplate: "withSidebar",
  controller: LoadController
});

Router.route("/shop/parts/:_id", {
  name: "shopPartsItem",
  template: "shopPartsItem",
  layoutTemplate: "withSidebar",
  controller: LoadController,
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
  controller: LoadController,
  data: function() {
    return Cars.findOne({ _id: this.params._id });
  },
  waitOn: function() {
    return this.subscribe("cars.all");
  }
});
