import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'node-simple-schema';

const Posts = new Mongo.Collection('posts');

export const PostsSchema = new SimpleSchema({

  _id: {
    type: String,
    min: 17,
    max: 17,
    optional: true
  },

  content: {
    type: String,
    label: 'Content',
    min: 1,
  },

  createdBy: {
    type: String,
    label: 'Created by',
    optional: true,
  },

  createdAt: {
    type: Date,
    defaultValue: new Date(),
    label : "Created at",
  },

  upVoteCount: {
    type: Number,
    label: "UpVoteCount",
    defaultValue: 0,
  },

  downVoteCount: {
    type: Number,
    label: "DownVoteCount",
    defaultValue: 0,
  },

  postPicture: {
    type: String,
    label: "PostPicture",
    optional: true,
  },

  upVotersUserIds: {
    type: [String],
    label: 'UpVoters UserIds',
    optional: true,
  },

  downVotersUserIds: {
    type: [String],
    label: 'DownVoters UserIds',
    optional: true,
  },

  isEdited: {
    type: Boolean,
    label: 'Post Edited',
    defaultValue: false
  },

  updatedAt: {
    type: Date,
    label: "Post date updated",
    defaultValue: new Date(),
  },




});

export default Posts;
