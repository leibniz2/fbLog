import Messages, {MessagesSchema} from '/lib/collections/messages.js';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {

  Meteor.methods({
    'sendMessage'(formData) {
      check(formData, {
        body : String,
        receiverUserId : String,
      });

      formData.senderUserId = this.userId;
      formData.createdAt = new Date();
      formData.isSeen = true;
      formData.deletedByUserIds = [];

      let Checker = MessagesSchema.namedContext('myContext');
      let schemaMatched = Checker.validate(formData);

      if(schemaMatched){
        return Messages.insert(formData);
      }

      let messageError = Checker.invalidKeys();

      _.map(messageError, function(o){
        throw new Meteor.Error(Checker.keyErrorMessage(o.name));
      })

    },


    'deleteMessage'(msgId, deletedByUserId){
      check(msgId, String);
      check(deletedByUserId, String);

      const selector = {
        _id : msgId
      };

      const options = {
        $push : {
          deletedByUserIds: deletedByUserId,
        }
      };

      return Messages.update(selector, options);
    }

  });
}
