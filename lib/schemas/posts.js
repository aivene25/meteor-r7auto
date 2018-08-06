export default postsSchema = new SimpleSchema({
  user_id: {
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
  title: {
    type: String
  },
  content: {
    type: String,
    autoform: {
      type: "summernote",
      class: "editor"
    }
  },
  category: {
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
  image: {
    type: String,
    autoform: {
      type: "cloudinary"
    }
  },

  created_at: {
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
