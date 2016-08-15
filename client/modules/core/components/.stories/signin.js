import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Signin from '../signin.jsx';

storiesOf('core.Signin', module)
  .add('default view', () => {
    return (
      <Signin />
    );
  })
