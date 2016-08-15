import Posts, {PostsSchema} from '/lib/collections/posts.js';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {

  // pass only the content, and link to picture (if any)
  Meteor.methods({
    'addPost'(formData) {

      check(formData, {
        content : String,
        postPicture : String,
      });

      formData.createdBy = this.userId; 
      formData.createdAt = new Date();
      formData.upVoteCount = 0;
      formData.downVoteCount = 0;
      formData.upVotersUserIds = [];
      formData.downVotersUserIds = [];
      formData.isEdited = false;
      formData.updatedAt = new Date();
      let Checker = PostsSchema.namedContext('myContext');
      let schemaMatched = Checker.validate(formData);

      if(schemaMatched){
        return Posts.insert(formData);
      }

      let messageError = Checker.invalidKeys();

      _.map(messageError, function(o){
        throw new Meteor.Error(Checker.keyErrorMessage(o.name))
      })
    },

    'updatePost'(postId, formData){

      check(postId, String);
      check(formData , {
        content : String,
        postPicture : String
      })

      const selector = {
        _id : postId
      };

      const options = {
        $set : {
          content: formData.content,
          postPicture: formData.postPicture,
          isEdited: true,
          updatedAt: new Date()
        }
      };

      Posts.update(selector, options);

    },

    'upVotePost'(postId, upVoterUserId){

      check(postId, String);
      check(upVoterUserId, String);

      return Posts.update({_id:postId}, {
        $inc:{"upVoteCount": +1},
        $push: {"upVotersUserIds": upVoterUserId}
      });
    },

    'removeUpVote'(postId, upVoterUserId){

      check(postId, String);
      check(upVoterUserId, String);

      return Posts.update({_id:postId}, {
        $inc:{"upVoteCount": -1},
        $pull: {"upVotersUserIds": upVoterUserId}
      });
    },

    'downVotePost'(postId, downVoterUserId){

      check(postId, String);
      check(downVoterUserId, String);

      return Posts.update({_id:postId}, {
        $inc:{"downVoteCount": +1},
        $push: {"downVotersUserIds": downVoterUserId}
      });
    },

    'removeDownVote'(postId, downVoterUserId){

      check(postId, String);
      check(downVoterUserId, String);

      return Posts.update({_id:postId}, {
        $inc:{"downVoteCount": -1},
        $pull: {"downVotersUserIds": downVoterUserId}
      });
    },

    'deletePost' (postId){

      check(postId, String);

      const selector = {
        _id : postId
      }

      Posts.remove(selector);

    }


  });
}
