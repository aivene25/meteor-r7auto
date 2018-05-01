Meteor.publish('posts.all', function(){
    return Posts.find({}, {});
})