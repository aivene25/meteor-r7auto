export default requestsSchema = new SimpleSchema({
  UserId: {
    type: String,
    autoValue : function(){
      if( this.isInsert ){
        return Meteor.userId();
      }
    },
    autoform:{
      type: "hidden"
    }
  },
  FirstName:{
    type: String
  },
  LastName:{
    type: String
  },
  Phone: {
    type: String
  },
  VehichleId: {
    type: String
  }
  
})