import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Signin from '../components/signin';

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('SIGNIN_ERROR');
  LocalState.get("buttonName") ? LocalState.get("buttonName"):LocalState.set("buttonName", "Next");
  if(Meteor.subscribe("getAllUserNames").ready()){
    const users = Meteor.users.find().map(function(user){ return user.username; });
    const pictures = Meteor.users.find().map(function(user){ return user.profile.picture; });
    const usersFullName =  Meteor.users.find().map(function(user){ return {firstName: user.profile.firstName, lastName: user.profile.lastName} });
    onData(null, {error, LocalState, users, pictures,usersFullName});
  }
};

export const depsMapper = (context, actions) => ({
  registerUser: actions.core.registerUser,
  signinUser: actions.core.signinUser,
  next: actions.core.next,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Signin);
