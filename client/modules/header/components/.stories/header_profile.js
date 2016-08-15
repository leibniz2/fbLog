import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import HeaderProfile from '../header_profile.jsx';

storiesOf('header.HeaderProfile', module)
  .add('default view', () => {
    return (
      <HeaderProfile />
    );
  })
