export default serviceRequestsSchema = new SimpleSchema({
  user_id: {
    type: String,
    autoValue : function(){
      if( this.isInsert ){
        if( Meteor.userId() != null){
          return Meteor.userId()
        }else{
          return "Guest"
        }
      }
    },
    autoform:{
      type: "hidden"
    }
  },
  first_name:{
    type: String
  },
  last_name:{
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  service_id: {
    type: String
  },
  service_title: {
    type: String
  }
})