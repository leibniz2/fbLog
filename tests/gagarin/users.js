describe('\'User\' Functionalities', () => {
  const param = { flavor: 'fiber' };
  const server = meteor(param, require('../fixtures').generate);
  const client = ddp(server, param);


  describe('User signup', function(){

    it('init user from fixture', function(){
      server.execute(function(){
        expect(Meteor.users.find().fetch().length).to.be.equal(1);
      })
    });

    it('it should have added new user', function(){
      server.execute(function(){
        var profile = {
          firstName : "John",
          lastName : "Lemon",
          email : "johnlemon@meteor.com",
          totalUpVotes : 0,
          totalDownVotes : 0,
          totalPosts: 0,
          location : "Cebu City",
          gender: "female",
          createdAt: new Date(),
          picture: "http://dummyimage.com/300x300/000/fff.png&text=Profile+Picture",
          isOnline: true
        };

        var userDetails = {
          username : "jlemon",
          password : "temp123",
          profile : profile
        };

        Meteor.call("addUser", userDetails);

        var users = Meteor.users.find().fetch();

        expect(users.length).to.be.equal(2);
      });

      it('new user was of type "object" ', function(){
        server.execute(function(){
          var users = Meteor.users.find().fetch();
          expect(users[1]).to.be.a("object");
        })
      })
    });

    describe('data validation', function(){

      it('correct username and type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].username).to.be.equal("jlemon");
          expect(newUser[1].username).to.be.a("string");
        })
      });

      it('correct email and type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].profile.email).to.be.equal("johnlemon@meteor.com");
          expect(newUser[1].profile.email).to.be.a("string");
        })
      });

      it('correct first name and type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].profile.firstName).to.be.equal("John");
          expect(newUser[1].profile.firstName).to.be.a("string");
        })

      });

      it('correct last name and type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].profile.lastName).to.be.equal("Lemon");
          expect(newUser[1].profile.lastName).to.be.a("string");
        })

      });

      it('correct location and type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].profile.location).to.be.equal("Cebu City");
          expect(newUser[1].profile.location).to.be.a("string");
        })

      });

      it('correct gender and type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].profile.gender).to.be.equal("female");
          expect(newUser[1].profile.gender).to.be.a("string");
        })

      });

      it('correct creation date type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].profile.createdAt).not.be.equal("");
          expect(newUser[1].profile.createdAt).to.be.a("date");
        })

      });

      it('correct picture link and type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].profile.picture).to.be.equal("http://dummyimage.com/300x300/000/fff.png&text=Profile+Picture");
           expect(newUser[1].profile.picture).to.be.a("string");
        })

      });

      it('correct online status and type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].profile.isOnline).to.be.equal(true);
          expect(newUser[1].profile.isOnline).to.be.a("boolean");
        })

      });

      it('set correct default values and type', function(){
        server.execute(function(){
          let newUser = Meteor.users.find().fetch();
          expect(newUser[1].profile.totalUpVotes).to.be.equal(0);
          expect(newUser[1].profile.totalDownVotes).to.be.equal(0);
          expect(newUser[1].profile.totalPosts).to.be.equal(0);
          expect(newUser[1].profile.totalUpVotes).to.be.a("number");
          expect(newUser[1].profile.totalDownVotes).to.be.a("number");
          expect(newUser[1].profile.totalPosts).to.be.a("number");
        })
      });
    });

  }); // end signup block

});
