import {Meteor} from 'meteor/meteor';

export default function () {

  Meteor.publish('usersCurrent', function(){
    return Meteor.users.find(this.userId);
  });

  Meteor.publish('getHeaderDetails', function () {
      if(!this.userId){
        return this.ready();
      }

      const selector = {
        _id: this.userId
      };

      const options = {
        fields: {
          "username" : 1,
          "profile.firstName" : 1,
          "profile.lastName" : 1,
          "profile.picture" : 1
        }
      }

      return Meteor.users.find(selector, options);
  });

  Meteor.publish('getUserDetails', function() {
      if(!this.userId){
        return this.ready();
      }

      const selector = {
        _id: this.userId
      };

      return Meteor.users.find(selector);

    });

  Meteor.publish('getAllUsers', function() {
    return Meteor.users.find({});
  });

  Meteor.publish('getSpecificUserDetails', function(id) {
    check(id, String);

    const selector = {
      _id: id
    };

    return Meteor.users.find(selector);
  });

  Meteor.publish('getAllUserNames', function() {
    return Meteor.users.find({}, {
      fields: {
        username:1,
        "profile.picture" : 1,
        "profile.firstName" : 1,
        "profile.lastName" : 1
      }
    });
  });

  Meteor.publish('getAllOnline', function() {
    return Meteor.users.find({isOnline: true}, {
      fields:{
        "profile.firstName": 1,
        "profile.lastName": 1
      }
    });
  })


  // experimental

  Meteor.publishComposite('getOnlineStats', {
    find: function() {
       const selector = {};

       const options = {
            fields: {
              "profile.firstName" : 1,
              "profile.lastName" : 1,
              "profile.isOnline" : 1
            },
            sort: {
              "profile.isOnline" : -1
            }
        };

      return Meteor.users.find(selector, options)
    },
    children: [
      {
        find: function(){
          const selector = {"profile.isOnline": true}
          return Meteor.users.find(selector);
        }
      }
    ]
  });


}
