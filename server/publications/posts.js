import {Posts} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {

  Meteor.publish('getSpecificPost', function (postId) {
    check(postId, String);

    const selector = {
      _id : postId
    }

    return Posts.find(selector);
  });


  Meteor.publishComposite('getSpecificPostWithUserDetails', function (postId) {
    check(postId, String);

    return {
        find: function() {
          return Posts.find({_id:postId});
        },
        children: [
          {
            find: function(post){
              return Meteor.users.find({_id:post.createdBy});
            }
          }
        ]
    }
  });

  Meteor.publishComposite('getAllPostsWithUserDetails', function(limit){
      check(limit, Number);

      return {
          find: function() {
            return Posts.find({}, {limit:limit,sort:{createdAt:-1}});
          },
          children: [
            {
              find: function(post){
                return Meteor.users.find({_id:post.createdBy});
              }
            }
          ]
      }
  });

  Meteor.publishComposite('getAllSpecificUsersPostsWithUserDetails', function(id,limit){
      check(limit, Number);
      check(id, String);
      return {
          find: function() {
            return Posts.find({createdBy:id},{limit:limit,sort:{createdAt:-1}});
          },
          children: [
            {
              find: function(post){
                return Meteor.users.find({_id:post.createdBy});
              }
            }
          ]
      }
  });

  Meteor.publish('getAllPostsMinimal', function(){
    const selector = {
      createdBy: this.userId
    };

    const options = {
      fields: {
        _id: 1
      }
    };

    return Posts.find({createdAt: this.userId}, {field: {_id: 1}});
  })

//   Meteor.publish('myPub', function() {
//   var self = this;
//   var initializing = true;

//   var handle = Posts.find().observeChanges({
//     added: function () {
//       if (!initializing)
//         console.log("added");
//     },
//     changed: function(id,fields) {
//       console.log(fields);
//     },
//     removed: function () {
//     }
//   });
//   initializing = false;
//   self.ready();

//   self.onStop(function () {
//     handle.stop();  // v. important to stop the observer when the subscription is stopped to avoid it running forever!
//   });
// });

}
