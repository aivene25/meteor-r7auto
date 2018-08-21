export default (carServicingSchema = new SimpleSchema({
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
  title:{
    type:String,
    allowedValues:["Interim", "Full", "Major"],
  },
  engine:{
    type:[String]
  },
  brakes:{
    type:[String]
  },
  drive:{
    type:[String]
  },
  electrical:{
    type:[String]
  },
  exhaust:{
    type:[String]
  },
  fuel:{
    type:[String]
  },
  general:{
    type:[String]
  },
  internal:{
    type:[String]
  },
  steering:{
    type:[String]
  },
  internal:{
    type:[String]
  },
  steering:{
    type:[String]
  },
  tyres:{
    type:[String]
  },
  vision:{
    type:[String]
  },
  price: {
    type: Number,
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
