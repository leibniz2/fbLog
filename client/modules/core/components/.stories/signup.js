import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Signup from '../signup.jsx';

storiesOf('core.Signup', module)
  .add('default view', () => {
    return (
      <Signup />
    );
  })
