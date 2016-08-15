import React from 'react';
import ContacList from './contactlist';
import Thread from './thread';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }
  //props
  //  users = all users sorted by online
  //  total_online = total users
  //  selected = partner object if message/:partnerid route
  //  type = 1 to display message, 0 to welcome page
  //  messages = messages if message/:partnerid route

  render() {
    const {users, total_online, selected, type, messages, sendMessage, err, clearErrors, LocalState, partner, deleteMessage} = this.props;
    return (
      <div className='col-md-8' id="messages">
        <ContacList users={users} total_online={total_online}  />
        <Thread partner={selected} type={type} messages={messages} sendMessage={sendMessage} err={err} clearErrors={clearErrors} LocalState={LocalState} route={partner} deleteMessage={deleteMessage}/>
      </div>
    );
  }

}

export default Message;
