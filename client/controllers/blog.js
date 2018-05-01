Template.blog.onCreated(function(){
    this.subscribe('posts.all');
})

Template.blog.helpers({
  post: () => {
    return Posts.find({}, {});
  }
});
