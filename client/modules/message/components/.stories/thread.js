import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Thread from '../thread.jsx';

storiesOf('message.Thread', module)
  .add('default view', () => {
    return (
      <Thread />
    );
  })
