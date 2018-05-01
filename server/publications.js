Meteor.publish('posts.all', function(){
    return Posts.find({}, {});
})
Meteor.publish('services.all', function(){
    return Services.find({}, {});
})