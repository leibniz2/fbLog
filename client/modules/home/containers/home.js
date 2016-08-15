import {useDeps, composeAll, composeWithTracker} from 'mantra-core';
import {Bert} from 'meteor/themeteorchef:bert';

import Home from '../components/home';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const error = LocalState.get('POST_ERROR');
  const voteError = LocalState.get('VOTE_ERROR');
  const avatar = LocalState.get('avatar');
  const view = false;
  LocalState.get('postLimit') ?  LocalState.get('postLimit') : LocalState.set('postLimit', 5);
  if(Meteor.subscribe('getAllPostsWithUserDetails', LocalState.get('postLimit')).ready()){
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
    onData(null, {posts,currentUser,error,voteError, LocalState, view, avatar});
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
  addPost: actions.home.addPost,
  deletePost: actions.home.deletePost,
  upVote: actions.home.upVote,
  downVote: actions.home.downVote,
  clearPostErrors: actions.home.clearPostErrors,
  addAvatar: actions.home.addAvatar,
  removeAvatar: actions.home.removeAvatar,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
