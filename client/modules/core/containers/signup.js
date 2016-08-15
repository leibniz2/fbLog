import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Signup from '../components/signup';

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('SIGN_UP_ERROR');
  const avatar = LocalState.get('avatar');
  onData(null, {error, avatar});
};

export const depsMapper = (context, actions) => ({
  signupUser: actions.core.signupUser,
  clearSignupErrors: actions.core.clearSignupErrors,
  addAvatar: actions.core.addAvatar,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Signup);
