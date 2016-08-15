import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Contactlist from '../contactlist.jsx';

storiesOf('message.Contactlist', module)
  .add('default view', () => {
    return (
      <Contactlist />
    );
  })
