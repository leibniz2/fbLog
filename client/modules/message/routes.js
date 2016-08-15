import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout';
import MessageWrapper from './components/messagewrapper';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/message', {
    name: 'message',
    triggersEnter: [authenticate],
    action() {
      mount(MainLayoutCtx, {
        content: () => (<MessageWrapper/>)
      });
    }
  });

  FlowRouter.route('/message/:partnerId', {
    name: 'specific message',
    tiggersEnter: [authenticate],
    action(partnerId) {
      mount(MainLayoutCtx, {
        content: () => (<MessageWrapper partnerId={partnerId} />)
      });
    }
  });

  function authenticate(){
    if(!Meteor.userId()){
      FlowRouter.go('/')
    }
  }
}
