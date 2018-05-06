export default (carsSchema = new SimpleSchema({
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
  Name: {
    type: String
  },
  Description: {
    type: String,
    autoform: {
      type: "summernote"
    }
  },
  Image: {
    type: String,
    autoform: {
      type: "cloudinary"
    }
  },
  Category: {
    type: String,
    allowedValues: ["Bus","Saloon", "SUV", "Truck"]
  },

  Price: {
    type: Number
  },

  Mileage: {
    type: Number,
    optional: true
  },
  Year: {
    type: Number,
    optional: true
  },
  Vendor: {
    type: String
  },
  Rating: {
    type: String,
    allowedValues: ["1","2", "3", "4", "5"]
  },
  Brand: {
    type: String,
    allowedValues: ["Acura","Honda","Toyote", "Hyundai", "Mercedes Benz", "Lexus", "Range Rover", "Land Rover", "Peugeot"]

  },
  Gallery: {
    type: [String],
    autoform: {
      type: "cloudinary"
    },
    optional: true
  },

  Reviews: {
    type: [String],
    autoform: {
        type: "hidden"
      },
      optional: true
  },
  RelatedProducts: {
    type: [String],
    optional: true
  },
  Tags: {
    type: [String],
    optional: true
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
}));
