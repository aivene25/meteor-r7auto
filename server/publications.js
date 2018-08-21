Meteor.publish('posts.all', function(){
    return Posts.find({}, {});
})
Meteor.publish('services.all', function(){
    return Services.find({}, {});
})

Meteor.publish('car-services.all', function(){
    return CarServicing.find({}, {});
})
Meteor.publish('cars.all', function(){
    return Cars.find({}, {});
})
Meteor.publish('parts.all', function(){
    return SpareParts.find({}, {});
})