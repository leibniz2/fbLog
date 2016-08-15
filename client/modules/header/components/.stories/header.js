import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Header from '../header.jsx';

storiesOf('header.Header', module)
  .add('default view', () => {
    return (
      <Header />
    );
  })
