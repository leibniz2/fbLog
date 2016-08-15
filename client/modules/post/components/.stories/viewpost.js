import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Viewpost from '../viewpost.jsx';

storiesOf('post.Viewpost', module)
  .add('default view', () => {
    return (
      <Viewpost />
    );
  })
