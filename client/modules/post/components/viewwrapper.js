import React from 'react';
import ViewPost from '../containers/viewpost'

class Viewwrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id} = this.props;
    return (
      <div>
        <ViewPost id={id}/>
      </div>
    );
  }
}

export default Viewwrapper;
