import React from 'react';
import Header from '../../header/containers/header'; 
import Message from '../containers/message';

class Messagewrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {partnerId} = this.props;
    return (
      <div className="wrapper-header">
        <Header />
        <Message partnerId={partnerId} />
      </div>
    );
  }
}

export default Messagewrapper;
