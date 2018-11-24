if (Meteor.isClient) {
  Meteor.subscribe("cars.all");
  Meteor.subscribe("carMakes.all");
  Meteor.subscribe("carCategories.all");
}

export default (carsSchema = new SimpleSchema({
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
  make: {
    type: String,
    autoform: {
      options: function() {
        return CarMakes.find().map(doc => {
          return { label: doc.name, value: doc.name};
        });
      }
    }
  },
  model: {
    type: String,
    custom() {
	  const carMake = this.field("make").value;
	  console.log(carMake);f
    }
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
    autoform: {
      options: function() {
        return CarCategories.find().map(function(doc) {
          return { label: doc.name, value: doc.name };
        });
      }
    }
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
  gallery: {
    type: Array
  },
  "gallery.$": {
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
    type: Array,
    optional: true
  },
  "related_products.$": {
    type: String,
    optional: true,
    autoform: {
      options: function() {
        return Cars.find().map(doc => {
          const carName =
            doc.make.toString() +
            "  " +
            doc.model.toString() +
            "  " +
            doc.year.toString();
          return { label: carName, value: doc._id };
        });
      }
    }
  },
  tags: {
    type: [String],
    optional: true
  },

  show: {
    type: Boolean,
    label: "Mark as visible"
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
