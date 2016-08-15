import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Bubble from '../bubble.jsx';

storiesOf('message.Bubble', module)
  .add('default view', () => {
    return (
      <Bubble />
    );
  })
