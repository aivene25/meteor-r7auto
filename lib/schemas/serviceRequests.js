export default (serviceRequestsSchema = new SimpleSchema({
  user_id: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        if (Meteor.userId() != null) {
          return Meteor.userId();
        } else {
          return "Guest";
        }
      }
    },
    autoform: {
      type: "hidden"
    }
  },
  first_name: {
    type: String,
    optional: true
  },
  last_name: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  service_id: {
    type: String,
    optional: true
  },
  service_title: {
    type: String,
    optional: true
  },
  vehicle_make: {
    type: String,
    optional: true
  },
  vehicle_model: {
    type: String,
    optional: true
  },
  vehicle_year: {
    type: String,
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
