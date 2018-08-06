import plugins from '../plugins';

Template.shopCarsItem.onCreated(function() {});

Template.shopCarsItem.helpers({
  relatedProducts: () => {
    console.log("testing value of undefined");
    return Cars.find().fetch();
  },
  formatPrice(price) {
    let val = price.toLocaleString("en");
    return val;
  }
});

Template.shopCarsItem.onRendered(function() {
  plugins();
});


