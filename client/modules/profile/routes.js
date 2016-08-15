import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout';
import Profilewrapper from './components/profilewrapper';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/profile/:id', {
    name: 'profile',
    triggersEnter: [authenticate],
    action(id) {
      mount(MainLayoutCtx, {
        content: () => (<Profilewrapper  id={id}/>)
      });
    }
  });

  function authenticate(){
    if(!Meteor.userId()){
      FlowRouter.go('/')
    }
  }
}
