import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Profile from '../profile.jsx';

storiesOf('profile.Profile', module)
  .add('default view', () => {
    return (
      <Profile />
    );
  })
