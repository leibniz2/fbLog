export default {
  redirectHome({FlowRouter}){
    FlowRouter.go('/home')
  },

  redirectMessages({FlowRouter}){
    FlowRouter.go('/message')
  },

  signout({FlowRouter, Meteor}){
    Meteor.call('userSignout', function(err){
      if (err) return;
      else {
        Meteor.logout();
        FlowRouter.go('/signin')
      }
    })
  },
}
