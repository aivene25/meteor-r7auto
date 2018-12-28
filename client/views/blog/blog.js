import plugins from "../../plugins";

Template.blog.onCreated(function() {
  this.subscribe("posts.all");
});

Template.blog.helpers({
  posts: () => Posts.find()
});

Template.blog.onRendered(function() {
  plugins();
});
