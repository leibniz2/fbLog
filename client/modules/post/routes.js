import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout';
import UpdateWrapper from './components/updatewrapper';
import ViewWrapper from './components/viewwrapper';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/update/post/:id', {
    name: '',
    triggersEnter: [authenticate],
    action(id) {
      mount(MainLayoutCtx, {
        content: () => (<UpdateWrapper id={id} />)
      });
    }
  });

  FlowRouter.route('/view/post/:id', {
    name: '',
    triggersEnter: [authenticate],
    action(id) {
      mount(MainLayoutCtx, {
        content: () => (<ViewWrapper id={id} />)
      });
    }
  });

  function authenticate(){
    if(!Meteor.userId()){
      FlowRouter.go('/')
    }
  }
}
