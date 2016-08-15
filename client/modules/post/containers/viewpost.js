import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Viewpost from '../components/viewpost';

export const composer = ({context, id}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const postId = id.id;
  const error = LocalState.get('POST_ERROR');
  const voteError = LocalState.get('VOTE_ERROR');
  const view = true;
  if(Meteor.subscribe('getSpecificPostWithUserDetails', postId).ready()){
    const posts = Collections.Posts.find({}).fetch();
    const currentUser = Meteor.userId();
    onData(null, {posts, currentUser,voteError,error,view});
  }
};

export const depsMapper = (context, actions) => ({
  deletePost: actions.home.deletePost,
  upVote: actions.home.upVote,
  downVote: actions.home.downVote,
  clearPostErrors: actions.home.clearPostErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Viewpost);
