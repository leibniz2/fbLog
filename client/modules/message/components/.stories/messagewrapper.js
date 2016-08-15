import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Messagewrapper from '../messagewrapper.jsx';

storiesOf('message.Messagewrapper', module)
  .add('default view', () => {
    return (
      <Messagewrapper />
    );
  })
