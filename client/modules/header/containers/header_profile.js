import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import HeaderProfile from '../components/header_profile';

export const composer = ({context,id}, onData) => {
  const {Meteor} = context();
  const userId = id.id;
  if(Meteor.subscribe('getSpecificUserDetails', userId).ready()){
    const user = Meteor.users.find({_id:userId}).fetch();
    const userProfile =  user[0];
    onData(null, {userProfile});
  }
};

export const depsMapper = (context) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderProfile);
