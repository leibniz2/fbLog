import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';
import Signin from './containers/signin';
import Signup from './containers/signup';
import Forbidden from './components/forbidden';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: '/',
    action() {
      FlowRouter.go('/signin');
    }
  });

  FlowRouter.route('/signin', {
    name: 'signin',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Signin />)
      });
    }
  });

  FlowRouter.route('/signup', {
    name: 'signup',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Signup />)
      });
    }
  });

  FlowRouter.notFound = {
    name: 'not-found',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Forbidden />)
      });
    }
  }
}
