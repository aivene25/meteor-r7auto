export default (carsSchema = new SimpleSchema({
  user_d: {
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
  make: {
    type: String
  },
  model: {
    type: String
  },

  description: {
    type: String,
    autoform: {
      type: "summernote"
    }
  },
  image: {
    type: String,
    autoform: {
      type: "cloudinary"
    }
  },
  category: {
    type: String,
    allowedValues: ["Bus", "Saloon", "SUV", "Truck"]
  },

  price: {
    type: Number
  },

  mileage: {
    type: Number,
    optional: true
  },
  year: {
    type: Number,
    optional: true
  },
  vendor: {
    type: String
  },
  rating: {
    type: String,
    allowedValues: ["1", "2", "3", "4", "5"]
  },
  brand: {
    type: String,
    allowedValues: [
      "Acura",
      "Honda",
      "Toyota",
      "Hyundai",
      "Mercedes Benz",
      "Lexus",
      "Range Rover",
      "Land Rover",
      "Peugeot"
    ]
  },
  gallery: {
    type: Array,
  },
  'gallery.$' :{
    type: String,
    autoform: {
      type: "cloudinary"
    }
  },

  reviews: {
    type: [String],
    autoform: {
      type: "hidden"
    },
    optional: true
  },
  related_products: {
    type: [String],
    optional: true
  },
  tags: {
    type: [String],
    optional: true
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
}));
