module.exports = {

  generate: function (){

    process.env.MONGO_URL = "mongodb://localhost:27017/gagarin";

    // var profile = {
    //   firstName : "Arunoda",
    //   lastName: "Susiripala",
    //   email : "kadiraio@meteor.com",
    //   totalUpVotes : 0,
    //   totalDownVotes: 0,
    //   totalPosts: 0,
    //   location : "Cebu City",
    //   gender: "male",
    //   createdAt: new Date(),
    //   picture: "http://dummyimage.com/300x300/000/fff.png&text=Profile+Picture",
    //   isOnline: true
    // };

    var formData = {
      username : "arunoda",
      password : "temp123",
      firstName : "Arunoda",
      lastName: "Susiripala",
      email : "kadiraio@meteor.com",
      totalUpVotes : 0,
      totalDownVotes: 0,
      totalPosts: 0,
      location : "Cebu City",
      gender: "male",
      createdAt: new Date(),
      picture: "http://dummyimage.com/300x300/000/fff.png&text=Profile+Picture",
      isOnline: true
    };

    Meteor.call("addUser", formData);
  }
};
