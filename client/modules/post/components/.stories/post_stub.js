import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import PostStub from '../post_stub.jsx';

storiesOf('post.PostStub', module)
  .add('default view', () => {
    return (
      <PostStub />
    );
  })
