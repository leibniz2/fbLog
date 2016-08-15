
describe('"Message" Functionalities', () => {
    const param = { flavor: 'fiber'};
    const server = meteor(param);
    const client = ddp(server, param);

    it('should init user', function(){
        server.execute(function(){
            let profile = {
                firstName : "Radley",
                lastName : "Rosal",
                email : "radley@meteor.com",
                totalUpVotes : 0,
                totalDownVotes : 0,
                totalPosts: 0,
                location : "Cebu City",
                gender: "male",
                createdAt: new Date(),
                picture: "http://dummyimage.com/300x300/000/fff.png&text=Profile+Picture",
                isOnline: true
            };

            let userDetails = {
                username : "radley",
                password : "temp123",
                profile : profile
            };

            Meteor.call('addUser', userDetails);
        });

            let userLogin = {
                user : {
                    username: "radley"
                },
                password: "temp123"
            }

            let loginCredentials = client.login(userLogin);

            expect(loginCredentials).to.be.a("object");
            expect(loginCredentials.id).to.be.a("string");
            expect(loginCredentials.token).to.be.a("string");
        });

    it('should validated user information', function(){
        client.subscribe('usersCurrent');
        let user = client.collection('users');
        expect(user).to.be.a('Object');

        for (var i in user) {
          expect(user[i].username).to.be.equal('radley');
        }
    })

    it('should send a new Message', function(){

      const formData = {
        body: "Sample Message",
        receiverUserId: "Sample Reciever User Id"
      };

      client.call('sendMessage', [formData]);
      client.sleep(200);
      client.subscribe("getSpecificThread", ["Sample Reciever User Id",1]);
      client.sleep(200);
      const messages = client.collection('messages');

      expect(messages).to.be.a('Object');

      for (var i in messages) {
        expect(messages[i].body).to.be.equal("Sample Message");
        expect(messages[i].receiverUserId).to.be.equal("Sample Reciever User Id");
      }

    });

}) //end top-most block
