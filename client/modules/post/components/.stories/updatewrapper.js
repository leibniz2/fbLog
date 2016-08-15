import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Updatewrapper from '../updatewrapper.jsx';

storiesOf('post.Updatewrapper', module)
  .add('default view', () => {
    return (
      <Updatewrapper />
    );
  })
