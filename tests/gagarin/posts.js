
describe('"Post" Functionalities', () => {
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

    it('should added a new post and check if it has the correct data added', function(){

      const formData = {
        content: "Sample Post",
        postPicture: "Sample Picture"
      };

      client.call('addPost', [formData]);
      client.sleep(200);
      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      const post = client.collection('posts');

      expect(post).to.be.a('Object');

      for (var i in post) {
        expect(post[i].content).to.be.equal("Sample Post");
        expect(post[i].postPicture).to.be.equal("Sample Picture");
      }

    });

    it('should update a new post and check if it has the correct data added', function(){

      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      var post = client.collection('posts');
      expect(post).to.be.a('Object');
      var postId;
      for (var i in post) {
        postId = i;
      }

      const formData = {
        content: "Sample Post Updated",
        postPicture: "Sample Picture Updated"
      };


      client.call('updatePost', [postId, formData]);
      client.sleep(200);
      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      post = client.collection('posts');
      expect(post).to.be.a('Object');

      for (var i in post) {
        expect(post[i].content).to.be.equal("Sample Post Updated");
        expect(post[i].postPicture).to.be.equal("Sample Picture Updated");
      }

    });

    it('should upvote post', function(){

      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      var post = client.collection('posts');
      expect(post).to.be.a('Object');
      var postId;
      for (var i in post) {
        postId = i;
      }

      client.subscribe("getUserDetails");
      const user = client.collection('users');
      expect(user).to.be.a('Object');
      var userId;
      for (var i in user) {
        userId = i;
      }

      client.call('upVotePost', [postId, userId]);
      client.sleep(200);
      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      post = client.collection('posts');
      expect(post).to.be.a('Object');

      for (var i in post) {
        expect(post[i].upVoteCount).to.be.equal(1);
        expect(post[i].upVotersUserIds[0]).to.be.equal(userId);
      }

    });

    it('should remove upvote post', function(){

      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      var post = client.collection('posts');
      expect(post).to.be.a('Object');
      var postId;
      for (var i in post) {
        postId = i;
      }

      client.subscribe("getUserDetails");
      const user = client.collection('users');
      expect(user).to.be.a('Object');
      var userId;
      for (var i in user) {
        userId = i;
      }

      client.call('removeUpVote', [postId, userId]);
      client.sleep(200);
      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      post = client.collection('posts');
      expect(post).to.be.a('Object');

      for (var i in post) {
        expect(post[i].upVoteCount).to.be.equal(0);
      }

    });


    it('should downvote post', function(){

      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      var post = client.collection('posts');
      expect(post).to.be.a('Object');
      var postId;
      for (var i in post) {
        postId = i;
      }

      client.subscribe("getUserDetails");
      const user = client.collection('users');
      expect(user).to.be.a('Object');
      var userId;
      for (var i in user) {
        userId = i;
      }

      client.call('downVotePost', [postId, userId]);
      client.sleep(200);
      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      post = client.collection('posts');
      expect(post).to.be.a('Object');

      for (var i in post) {
        expect(post[i].downVoteCount).to.be.equal(1);
        expect(post[i].downVotersUserIds[0]).to.be.equal(userId);
      }

    });

    it('should remove downvote post', function(){

      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      var post = client.collection('posts');
      expect(post).to.be.a('Object');
      var postId;
      for (var i in post) {
        postId = i;
      }

      client.subscribe("getUserDetails");
      const user = client.collection('users');
      expect(user).to.be.a('Object');
      var userId;
      for (var i in user) {
        userId = i;
      }

      client.call('removeDownVote', [postId, userId]);
      client.sleep(200);
      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      post = client.collection('posts');
      expect(post).to.be.a('Object');

      for (var i in post) {
        expect(post[i].downVoteCount).to.be.equal(0);
      }

    });

    it('should delete post', function(){

      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      var post = client.collection('posts');
      expect(post).to.be.a('Object');
      var postId;
      for (var i in post) {
        postId = i;
      }
      client.call('deletePost', [postId]);
      client.sleep(200);
      client.subscribe("getAllPostsWithUserDetails", [1]);
      client.sleep(200);
      post = client.collection('posts');
      expect(post).to.be.empty;

    });

}) //end top-most block
