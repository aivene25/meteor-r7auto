export default postsSchema = new SimpleSchema({
  UserId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      type: "hidden"
    }
  },
  Title: {
    type: String
  },
  Content: {
    type: String,
    autoform: {
      type: "summernote",
      class: "editor"
    }
  },
  Category: {
    type: String,
    allowedValues: [
      "Services",
      "Repairs",
      "Good To Know",
      "Diagnostic",
      "Eletrical",
      "Certified"
    ]
  },
  Image: {
    type: String,
    autoform: {
      type: "cloudinary"
    }
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    },
    autoform: {
      type: "hidden"
    }
  }
});
