import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import PostUpdate from '../post_update.jsx';

storiesOf('post.PostUpdate', module)
  .add('default view', () => {
    return (
      <PostUpdate />
    );
  })
