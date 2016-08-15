import {Messages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  // Meteor.publishComposite('getSpecificThread', function(partnerId){
  //     check(partnerId, String);
  //     const currentId = this.userId;
  //     const options = {
  //       sort: {
  //         "createdAt" : -1
  //       }
  //     }

  //     return {
  //         find: function() {
  //           return Messages.find({senderUserId: currentId, receiverUserId: partnerId}, options);
  //         },
  //         children: [
  //           {
  //             find: function(){
  //               return Messages.find({senderUserId: partnerId, receiverUserId: currentId }, options);
  //             }
  //           }
  //         ]
  //     }
  // });

  Meteor.publish('getSpecificThread', function(partnerId, limit){
    check(partnerId, String);
    check(limit, Number);

    const currentId = this.userId;

    const selector = {
      $or : [
        {
          senderUserId: currentId, receiverUserId: partnerId
        },
        {
          senderUserId: partnerId, receiverUserId: currentId
        }
      ],
      deletedByUserIds: {
        $ne : currentId
      }
    }

    const options = {
      sort: {
        createdAt : -1
      },
      limit : limit
    };


    return Messages.find(selector, options);
  });

  Meteor.publish('getAllMessagesMinimal', function(){
    const currentId = this.userId;

    const selector = {
      $or : [
        {
          senderUserId: currentId
        },
        {
          receiverUserId: currentId
        }
      ]
    }
     // default returns id but explicitly return id only dont try hard
    const options = {
      fields: {
        senderUserId: 1,
      }
    };

    return Messages.find(selector, options);
  });

  Meteor.publish('observeThread', function(){
    const isTyping = this.connection._isTyping;

    return isTyping;
  })

}
