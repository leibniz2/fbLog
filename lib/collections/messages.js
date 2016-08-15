import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'node-simple-schema';

const Messages = new Mongo.Collection('messages');

export const MessagesSchema = new SimpleSchema({

  senderUserId: {
    type: String,
    label: 'Sender UserId',
  },

  receiverUserId: {
    type: String,
    label: 'Receiver UserId',
  },

  body: {
    type: String,
    label: 'Body',
    min: 1,
    max: 160,
  },

  createdAt: {
    type: Date,
    defaultValue: new Date(),
    label : "Created at",
  },

  isSeen: {
    type: Boolean,
    defaultValue: true,
    label: "Message isSeen"
  },

  deletedByUserIds: {
    type: [String],
    label: 'Deleted by UserIds',
    optional: true
  },

});

export default Messages;
