export default (inspectionRequestsSchema = new SimpleSchema({
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
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  vehicle_id: {
    type: String
  },
  vehicle_make: {
    type: String
  },
  vehicle_model: {
    type: String
  },
}));
