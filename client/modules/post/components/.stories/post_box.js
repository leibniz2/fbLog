import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import PostBox from '../post_box.jsx';

storiesOf('post.PostBox', module)
  .add('default view', () => {
    return (
      <PostBox />
    );
  })
