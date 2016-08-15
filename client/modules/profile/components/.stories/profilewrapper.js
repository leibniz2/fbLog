import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Profilewrapper from '../profilewrapper.jsx';

storiesOf('profile.Profilewrapper', module)
  .add('default view', () => {
    return (
      <Profilewrapper />
    );
  })
