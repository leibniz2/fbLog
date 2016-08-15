import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Homewrapper from '../homewrapper.jsx';

storiesOf('home.Homewrapper', module)
  .add('default view', () => {
    return (
      <Homewrapper />
    );
  })
