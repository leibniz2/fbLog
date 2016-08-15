import {useDeps, composeAll, composeWithTracker} from 'mantra-core';
import {Bert} from 'meteor/themeteorchef:bert';
import Header from '../components/header';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter, LocalState} = context();
  const id = Meteor.userId();
  const user = Meteor.users.find({_id:id}).fetch();
  const route = FlowRouter._current.path;
  if(route === '/home'){
    if(Meteor.subscribe('getAllMessagesMinimal').ready()){
       const msgs = Collections.Messages.find({});
       const messages = msgs.fetch();
       const index = messages.length;
       var count = 0;
       LocalState.get('initailAdd') ? LocalState.get('initailAdd') : LocalState.set('initailAdd', true) 
        msgs.observeChanges({
          added: function(id, fields){
            count++;
            const msg = `You have a new message from <a href="/message/${fields.senderUserId}">someone</a>`
            if(count > index){
              Bert.alert({
                title: 'Hello there!',
                message: msg,
                type: 'notify-message',  
                style: 'growl-bottom-right',
                icon: 'fa-info'
              });
            }
          }
        })
        const currentUser =  user[0];
        onData(null, {currentUser});
    }
  } else {
    const currentUser =  user[0];
    onData(null, {currentUser});
  }
};

export const depsMapper = (context, actions) => ({
  redirectHome: actions.header.redirectHome,
  redirectMessages: actions.header.redirectMessages,
  signout: actions.header.signout,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Header);
