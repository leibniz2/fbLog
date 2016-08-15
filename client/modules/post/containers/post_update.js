import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import PostUpdate from '../components/post_update';

export const composer = ({context, id}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const postId = id.id;
  const error = LocalState.get('UPDATE_POST_ERROR');
  const avatar = LocalState.get('avatar');
  if(Meteor.subscribe('getSpecificPost', postId).ready()){
    const posts = Collections.Posts.find().fetch();
    const post = posts[0];
    onData(null, {post,error, avatar, LocalState});
  }
};

export const depsMapper = (context, actions) => ({
  saveChanges: actions.post.saveChanges,
  discardChanges: actions.post.discardChanges,
  clearUpdatePostErrors: actions.post.clearUpdatePostErrors,
  addAvatar: actions.post.addAvatar,
  removeAvatar: actions.post.removeAvatar,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PostUpdate);
