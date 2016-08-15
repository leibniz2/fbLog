import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Viewwrapper from '../viewwrapper.jsx';

storiesOf('post.Viewwrapper', module)
  .add('default view', () => {
    return (
      <Viewwrapper />
    );
  })
