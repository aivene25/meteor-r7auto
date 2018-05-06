Template.shopCars.onCreated( function(){
    this.subscribe('cars.all');
})

Template.shopCars.helpers({
    data:()=>{
        return Cars.find({},{}).fetch();
    }
})