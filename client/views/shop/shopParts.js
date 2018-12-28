import plugins from "../../plugins";

Template.shopParts.onCreated(function() {
  this.subscribe("parts.all");
  this.searchTerm = new ReactiveVar(false);
});

Template.shopParts.helpers({
  data: () => {
    const term = Template.instance().searchTerm.get();

    if (term) {
      return SpareParts.find({
        title: { $regex: term, $options: "i" }
      }).fetch();
    } else {
      return SpareParts.find().fetch();
    }
  },
  relatedProducts: () => SpareParts.find().fetch()
});

Template.shopParts.events({
  "keyup #product_search": function(event, template) {
    event.preventDefault();
    const term = event.currentTarget.value;
    template.searchTerm.set(term.trim());
  }
});

Template.shopParts.onRendered(function() {
  plugins();
});
