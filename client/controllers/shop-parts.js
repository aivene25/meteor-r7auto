Template.shopParts.onCreated( function(){
    this.subscribe('cars.all');
})

Template.shopParts.helpers({
    data:()=>{
        return SpareParts.find({},{}).fetch();
    }
})