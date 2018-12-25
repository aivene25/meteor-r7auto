import plugins from "../../plugins";

Template.shopCars.onCreated(function() {
  this.subscribe("cars.all");
  this.searchTerm = new ReactiveVar(false);
});

Template.shopCars.helpers({
  data: () => {
    const term = Template.instance().searchTerm.get();
    if (term) {
      return Cars.find({
        $or: [
          {
            make: { $regex: term, $options: "i" }
          },
          {
            brand: { $regex: term, $options: "i" }
          },
          {
            model: { $regex: term, $options: "i" }
          }
        ]
      }).fetch();
    } else {
      return Cars.find().fetch();
    }
  },
  topVehicles: () => Cars.find().fetch()
});

Template.shopCars.events({
  "keyup #product_search": function(event, template) {
    event.preventDefault();
    const term = event.currentTarget.value;
    template.searchTerm.set(term.trim());
  }
});

Template.shopCars.onRendered(function() {
  plugins();
});
