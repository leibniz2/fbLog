import {useDeps, composeAll, composeWithTracker} from 'mantra-core';
import {Bert} from 'meteor/themeteorchef:bert';
import Profile from '../components/profile';

export const composer = ({context, id}, onData) => {
  const {Meteor, Collections,LocalState} = context();
  const error = LocalState.get('POST_ERROR');
  const voteError = LocalState.get('VOTE_ERROR');
  const userId = id.id;
  LocalState.get('postLimit') ?  LocalState.get('postLimit') : LocalState.set('postLimit', 5);
  if(Meteor.subscribe('getAllSpecificUsersPostsWithUserDetails', userId, LocalState.get('postLimit')).ready()){
    const query = Collections.Posts.find({},{sort:{createdAt:-1}});
    const owned = Collections.Posts.find({createdBy: Meteor.userId()});
    const posts = query.fetch();

    owned.observe({
      changedAt: function(newDocument, oldDocument) {
        // if previously voted, then it should be a neutral action (cancelled vote)
        checkDiff(newDocument, oldDocument);
      }
    });

    const currentUser = Meteor.userId();
    onData(null, {posts,currentUser,error,voteError, LocalState});
  }
};

function checkDiff(newDocument, oldDocument){
  const id = newDocument._id;
  const currentUser = Meteor.userId();
  // user down voted
  if((newDocument.downVotersUserIds.length > oldDocument.downVotersUserIds.length)){
    const voters_list = newDocument.downVotersUserIds;
    if(voters_list[voters_list.length-1] != currentUser){
      const voter_id = voters_list[voters_list.length-1];
      const msg = `<a href="profile/${voter_id}">Someone</a> downvoted your <a href="/view/post/${id}">post</a>.`;
      Bert.alert({
        title: 'Hello there!',
        message: msg,
        type: 'notify-downvote',  
        style: 'growl-bottom-right',
        icon: 'fa-info'
      });
    }
      
  }
  // user up voted
   else if(newDocument.upVotersUserIds.length > oldDocument.upVotersUserIds.length){
    const voters_list = newDocument.upVotersUserIds;
    const user_voted = voters_list[voters_list.length-1] == currentUser ? "You" : "Someone";

    if(voters_list[voters_list.length-1] != currentUser){
        const voter_id = voters_list[voters_list.length-1]; 
        const msg = `<a href="profile/${voter_id}">${user_voted}</a> upvoted your <a href="/view/post/${id}">post</a>.`;
        Bert.alert({
          title: 'Hello there!',
          message: msg,
          type: 'notify-upvote',  
          style: 'growl-bottom-right',
          icon: 'fa-info'
        });
    }
   
  }
}

export const depsMapper = (context, actions) => ({
  deletePost: actions.home.deletePost,
  upVote: actions.profile.upVote,
  downVote: actions.profile.downVote,
  clearPostErrors: actions.home.clearPostErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Profile);
