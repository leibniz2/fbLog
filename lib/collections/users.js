import SimpleSchema from 'node-simple-schema';

const Users = new SimpleSchema({

  profile: {
    type: Object,
    label : "Profile",
    optional: true,
  },

  "profile.firstName" : {
    type: String,
    min : 2,
    max: 15,
    label : "Firstname",
  },

  "profile.lastName" : {
    type: String,
    min : 2,
    max: 15,
    label : "Lastname",
  },

  "profile.email" : {
    label : "EmailAddress",
    type: String,
    regEx: [
      SimpleSchema.RegEx.Email ,
      /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    ],
  },

  "profile.totalUpVotes" : {
    type: Number,
    label: "TotalUpVotes",
    defaultValue: 0,
  },

  "profile.totalDownVotes" : {
    type: Number,
    label: "TotalDownVotes",
    defaultValue: 0,
  },

  "profile.totalPosts" : {
    type: Number,
    label: "TotalPosts",
    defaultValue: 0,
  },

  "profile.location" : {
    type: String,
    min : 0,
    max: 50,
    label : "Location",
  },

  "profile.gender" : {
    type: String,
    allowedValues: ["male", "female"],
    label: "Gender",
    optional: true,
  },

  "profile.createdAt" : {
    type: Date,
    defaultValue: new Date(),
    label : "CreatedAt",
  },

  "profile.picture" : {
    type: String,
    label : "Picture",
  },

  "profile.isOnline" : {
    type: Boolean,
    defaultValue: false,
    label: "IsOnline",
  },

  username: {
    type: String,
    label:"Username",
    optional: true,
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },

  password: {
    type: String,
    label: "Password",
    min: 6,
    max: 100,
    optional: true,
  },

});

export default Users;
