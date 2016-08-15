import React from 'react';

class Bubble extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteMessage(e){
    e.preventDefault();
    const {deleteMessage, id} = this.props;
    deleteMessage(id);
  }

  render() {
    const {isOwned} = this.props;
    return (
      <div>
        {isOwned ? this.ownedBubble() : this.partnerBubble()}
      </div>
    );
  }

  partnerBubble(){
    const {timeStamp} = this.props;
    return (
       <div className="talk-bubble-partner tri-right round left-in" id="popOut">
        <div className="talktext">
          <a onClick={this.deleteMessage.bind(this)}><span className="glyphicon glyphicon-remove pull-right" aria-hidden="true" id='del'></span></a>
          <p>{this.props.content}</p>
          <p><br></br>Sent: <em>{timeStamp}</em></p>
        </div>
        <br/>
      </div>
    );
  }

  ownedBubble(){
    const {timeStamp} = this.props;
    return (
      <div className="row">
        <div className="owned-bubble">
          <div className="talk-bubble tri-right round right-in" id="popOut">
            <div className="talktext">
              <a onClick={this.deleteMessage.bind(this)}><span className="glyphicon glyphicon-remove pull-right" aria-hidden="true" id='del'></span></a>
              <p>{this.props.content}</p>
              <p><br></br>Sent: <em>{timeStamp}</em></p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Bubble;
