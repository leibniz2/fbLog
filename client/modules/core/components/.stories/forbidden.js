import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Forbidden from '../forbidden.jsx';

storiesOf('core.Forbidden', module)
  .add('default view', () => {
    return (
      <Forbidden />
    );
  })
