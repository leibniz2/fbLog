import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Message from '../message.jsx';

storiesOf('message.Message', module)
  .add('default view', () => {
    return (
      <Message />
    );
  })
