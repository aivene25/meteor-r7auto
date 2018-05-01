if (Meteor.isServer) {
  var database = new MongoInternals.RemoteCollectionDriver(
    "mongodb://heroku_zjkh19d6:k3nkb1gaite3dq031jdipk333p@ds263759.mlab.com:63759/heroku_zjkh19d6"
  );

  Posts = new Mongo.Collection("posts", { _driver: database });
  Services = new Mongo.Collection("services", { _driver: database });
} else {
  Services = new Mongo.Collection("services");
  Posts = new Mongo.Collection("posts");
}
servicesSchema = new SimpleSchema({
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
  Service: {
    type: String
  },
  ShortDescription: {
    type: String,
    
  },
  Description: {
    type: String,
    autoform:{
      type:'summernote'
    }
  },
  Icon: {
    type: String,
    allowedValues:[
        "as-icon-car-parts-29",
        "as-icon-car-parts-28","as-icon-car-parts-27","as-icon-car-parts-26","as-icon-car-parts-25","as-icon-car-parts-24","as-icon-car-parts-23","as-icon-car-parts-22","as-icon-car-parts-21","as-icon-car-parts-20","as-icon-car-parts-19","as-icon-car-parts-18","as-icon-car-parts-17","as-icon-car-parts-16","as-icon-car-parts-15","as-icon-car-parts-14","as-icon-car-parts-13","as-icon-car-parts-12","as-icon-car-parts-11","as-icon-car-parts-10","as-icon-car-parts-9","as-icon-car-parts-8","as-icon-car-parts-7","as-icon-car-parts-6","as-icon-car-parts-5","as-icon-car-parts-4","as-icon-car-parts-3","as-icon-car-parts-2","as-icon-car-parts","as-icon-charter","as-icon-clutch","as-icon-disc-brake2","as-icon-filter","as-icon-generator","as-icon-lamp","as-icon-spark-plug2","as-icon-steering-wheel3","as-icon-suspension2"
    ]
  },
  Steps: {
    type: [String]
  },
  Price: {
    type: Number
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
postsSchema = new SimpleSchema({
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

Posts.attachSchema(postsSchema);
Services.attachSchema(servicesSchema);