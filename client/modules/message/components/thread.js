import React from 'react';
import Bubbles from './bubble';
import moment from 'moment';
import FlipMove from 'react-flip-move';
import {Bert} from 'meteor/themeteorchef:bert';

class Thread extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps){
    const {route, messages, LocalState} = this.props;
    if(messages === undefined && newProps.messages !== undefined){
      LocalState.set('msgLimit', 5);
    } else if (messages !== undefined && newProps.messages === undefined){
      return;
    } else if (messages !== undefined && newProps.messages !== undefined){
      if(route !== newProps.route){
        const {LocalState} = this.props;
        LocalState.set('msgLimit', null);
      } else {
        if(messages.length === newProps.messages.length){
          this.updateScroll();
        }
      }
    }
  }

  componentDidMount(){
    if($('#thread').length){
      this.updateScroll();
    }
  }

  componentDidUpdate(){
    if($('#thread').length){
      this.updateScroll();
    }
  }

  // check thread type, 1 selected , 0 otherwise
  // receive person name, all messages
  render() {
    const {type} = this.props;
    return (
      <div className='col-md-10'>
          {type == 1 ? this.selected() : this.notSelected()}
      </div>
    );
  }

  handleSend(event){
    event.preventDefault();
    const {sendMessage, partner} = this.props;
    let sendBox = document.getElementById('post').value;

    const formData = {
      body : sendBox,
      receiverUserId: partner[0]._id
    }

    document.getElementById('post').value = "";

    sendMessage(formData);
  }

  handleSubmit(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13 && !e.shiftKey){
      this.handleSend(e);
    }
  }

  moreResults(){
    const {LocalState,postWithUserDetails} = this.props;
    return !(postWithUserDetails.length < LocalState.get('msgLimit'));
  }

  loadMore(e){
    e.preventDefault();
    const {LocalState} = this.props;
    LocalState.set("msgLimit", LocalState.get('msgLimit')+5);
  }

  updateScroll(){
    var objDiv = document.getElementById("thread");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

 
  notSelected(){
     return (
       <div className='col-md-9'>
           <div className="panel panel-success" id='contactlist'>
              <div className="panel-heading">
                <span className="title">Messages Home</span>
              </div>
              <div className="panel-body">
                 <h4>Select a conversation to start chatting</h4>
              </div>
            </div>
       </div>

    );
  }


  selected(){
    const {partner, messages, err, clearErrors} = this.props;
    if(err) {
      Bert.alert( err, 'danger', 'growl-top-right' );
      clearErrors();
    }
    return (
         <div className="col-md-9">
           <div className="panel panel-success" id="popOut" >
              <div className="panel-heading">
                <span className="title-message">{partner[0].profile.firstName}  {partner[0].profile.lastName} &nbsp;
                  <span id={partner[0].profile.isOnline ? "glyphicon-online-dot" : "glyphicon-offline-dot" }></span>
                </span>
              </div>
              <div className="panel-body" id="thread">
                {messages.length != 0 && this.moreResults.bind(this) ?
                  <a href="#" onClick={this.loadMore.bind(this)}>&lt;&lt;+</a> : ""
                }
                {messages.length == 0 ? this.renderSelectedEmpty() : this.renderSelected()}
              </div>
            </div>
            <div className="panel panel-default" id='msg'>
              <div className="panel-body">
                <div className='row'>
                  <form className='container-fluid col-md-11'><textarea onKeyDown={this.handleSubmit.bind(this)} className="form-control" rows="5" id="post"></textarea></form>
                  <button className='btn btn-success' id="msgBtn" onClick={this.handleSend.bind(this)}>Send</button>
                </div>
              </div>
          </div>
       </div>
    );
  }

  renderSelectedEmpty(){
    return (
       <FlipMove enterAnimation="fade" leaveAnimation="fade" >
        <p>No conversation yet with this person</p>
      </FlipMove>
    );

  }

  renderSelected(){
    const {messages, deleteMessage} = this.props;
    return (
       <FlipMove enterAnimation="accordianVertical" leaveAnimation="accordianVertical" >
                {messages.map(function(message){
                  const isOwned = (message.senderUserId == Meteor.userId() ? true : false);
                  const timestamp = (moment(message.createdAt).startOf('minute').fromNow());
                  return <Bubbles key={message._id} content={message.body} isOwned={isOwned} timeStamp={timestamp} deleteMessage={deleteMessage} id={message._id}/>
                })}
                </FlipMove>
    );
  }
}

export default Thread;
