export default {
  sendMessage({LocalState}, formData){
      Meteor.call('sendMessage', formData, function(err){
        if(err) return LocalState.set('MESSAGE_ERROR', err.error);
        return LocalState.set('MESSAGE_ERROR', null);
      })
  },

  deleteMessage({Meteor, LocalState}, msgId){
    Meteor.call("deleteMessage", msgId, Meteor.userId(), function(err){
      if(err) return LocalState.set('MESSAGE_ERROR', null);
      else console.log("deleted!");
    })
  },

  clearErrors({LocalState}){
    return LocalState.set('MESSAGE_ERROR', null);
  },

}
