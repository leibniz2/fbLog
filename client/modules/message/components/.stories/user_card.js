import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import UserCard from '../user_card.jsx';

storiesOf('message.UserCard', module)
  .add('default view', () => {
    return (
      <UserCard />
    );
  })
