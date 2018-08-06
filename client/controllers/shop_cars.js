import plugins from '../plugins';

Template.shopCars.onCreated( function(){
    this.subscribe('cars.all');
});

Template.shopCars.helpers({
    data:()=>{
        return Cars.find({},{}).fetch();
    },
    formatPrice( price){
      let val = price.toLocaleString("en");
      return val;
    }
});

Template.shopCars.onRendered(function() {
  plugins();
});
