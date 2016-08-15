import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout';
import Home from './components/homewrapper';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  
  FlowRouter.route('/home', {
    name: 'home',
    triggersEnter: [authenticate],
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  function authenticate(){
    if(!Meteor.userId()){
      FlowRouter.go('/')
    }
  }

}
