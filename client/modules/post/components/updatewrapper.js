import React from 'react';
import Header from '../../header/containers/header';
import PostUpdate from '../containers/post_update';

class Updatewrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id} = this.props;
    return (
      <div>
        <Header />
        <PostUpdate id={id}/>
      </div>
    );
  }
}

export default Updatewrapper;
