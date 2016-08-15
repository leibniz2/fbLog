import {Users} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';

Meteor.startup( () => {
  Accounts.config({
    forbidClientAccountCreation: true,
  });
});


export default function () {

  Meteor.methods({
    'addUser'(formData) {
        check(formData, Object);

        // const profile = {
        //   "firstName" : formData.firstName,
        //   "lastName" : formData.lastName,
        //   "email" : formData.email,
        //   "totalUpVotes" : 0,
        //   "totalDownVotes" : 0,
        //   "totalPosts" : 0,
        //   "location" : formData.location,
        //   "gender" : formData.gender,
        //   "createdAt" : new Date(),
        //   "picture" : formData.picture,
        //   "isOnline" : formData.isOnline
        // }
        const profile = formData.profile;

        var userDetails = {
          "username" : formData.username,
          "password" : formData.password,
          "profile" : profile
        }

        let Checker = Users.namedContext('myContext');
        let schemaMatched = Checker.validate(userDetails);

        if(!schemaMatched){
          let signUpErrors = Checker.invalidKeys();
          throw new Meteor.Error(Checker.keyErrorMessage(signUpErrors[0].name));
        }

        return Accounts.createUser(userDetails);

    },

    'userSignout'(){
      return Meteor.users.update({_id:Meteor.userId()}, {
        $set: {"profile.isOnline": false,}
      });
    },

    'userSignin'(){
      return Meteor.users.update({_id:Meteor.userId()}, {
        $set: {"profile.isOnline": true,}
      });
    },

    'incrementTotalPostCount'(){
      return Meteor.users.update({_id:Meteor.userId()}, {
        $inc:{"profile.totalPosts": +1},
      });
    },

    'incrementTotalUpVotesCount'(id){
      check(id, String);
      return Meteor.users.update({_id:id}, {
        $inc:{"profile.totalUpVotes": +1},
      });
    },

    'incrementTotalDownVotesCount'(id){
      check(id, String);
      return Meteor.users.update({_id:id}, {
        $inc:{"profile.totalDownVotes": +1},
      });
    },

    'decrementTotalPostCount'(){
      return Meteor.users.update({_id:Meteor.userId()}, {
        $inc:{"profile.totalPosts": -1},
      });
    },

    'decrementTotalUpVotesCount'(id){
      check(id, String);
      return Meteor.users.update({_id:id}, {
        $inc:{"profile.totalUpVotes": -1},
      });
    },

    'decrementTotalDownVotesCount'(id){
       check(id, String);
      return Meteor.users.update({_id:id}, {
        $inc:{"profile.totalDownVotes": -1},
      });
    },

    'decrementTotalUpVotesCountUponDelete'(totalPostUpVotes){
      check(totalPostUpVotes, Number);
      return Meteor.users.update({_id:Meteor.userId()}, {
        $inc:{"profile.totalUpVotes": -totalPostUpVotes},
      });
    },

    'decrementTotalDownVotesCountUponDelete'(totalPostDownVotes){
      check(totalPostDownVotes, Number);
      return Meteor.users.update({_id:Meteor.userId()}, {
        $inc:{"profile.totalDownVotes": -totalPostDownVotes},
      });
    },
  });
}
