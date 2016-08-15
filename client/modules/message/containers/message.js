import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Message from '../components/message';

export const composer = ({context, partnerId}, onData) => {
    const {Meteor, FlowRouter, Collections, LocalState, FlipMove, } = context();
    const currentRoute = FlowRouter.getRouteName();
    const partner = partnerId ? partnerId.partnerId : "-1";
    const err = LocalState.get('MESSAGE_ERROR');
    LocalState.get('msgLimit') ?  LocalState.get('msgLimit') : LocalState.set('msgLimit', 5);
    if(Meteor.subscribe('getAllUsers').ready()){
        const users = Meteor.users.find({}).fetch();
        const total_online = Object.keys(users).length;
        var selected, type, messages;

        if(currentRoute == 'message'){
            selected = false, type = 0;
            onData(null, {users, total_online, selected, type, messages,LocalState, partner })
        } else {
            selected = Meteor.users.find({_id: partner}).fetch();
            type = 1;
            if(Meteor.subscribe('getSpecificThread', partner, LocalState.get('msgLimit')).ready()){

              messages = Collections.Messages.find({},{sort:{createdAt :1}}).fetch();
              onData(null, {users, total_online, selected, type, messages,err, LocalState, partner});
            }

        }
    }

};


export const depsMapper = (context, actions) => ({
  clearErrors: actions.message.clearErrors,
  sendMessage: actions.message.sendMessage,
  handleTyping: actions.message.handleTyping,
  deleteMessage: actions.message.deleteMessage,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Message);
