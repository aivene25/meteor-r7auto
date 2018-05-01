if (Meteor.isServer) {
  var database = new MongoInternals.RemoteCollectionDriver(
    "mongodb://heroku_zjkh19d6:k3nkb1gaite3dq031jdipk333p@ds263759.mlab.com:63759/heroku_zjkh19d6"
  );

  Posts = new Mongo.Collection("posts", { _driver: database });
} else {
  Posts = new Mongo.Collection("posts");
}

postsSchema = new SimpleSchema({
  UserId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform:{
        afFieldInput:{
            type:"hidden"
        }
    }
  },
  Title: {
    type: String
  },
  Content: {
    type: String,
    autoform: {
        afFieldInput: {
          type: "summernote",
          class:"editor",
          rows:"7"
        }
      }

  },
  Category: {
    type: String,
    allowedValues:[
        'Services', 'Repairs', 'Good To Know'
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
    }
  }
});

Posts.attachSchema(postsSchema);
