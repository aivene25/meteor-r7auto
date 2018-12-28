import plugins from "../../plugins";

Template.blogDetail.onCreated(function() {
  const { _id } = Router.current().params;
  this.subscribe("posts.one", _id);
});

Template.blogDetail.helpers({
  posts: () => Posts.findOne()
});

Template.blogDetail.onRendered(function() {
  plugins();
});
