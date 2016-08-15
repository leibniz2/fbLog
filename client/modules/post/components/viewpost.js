import React from 'react';
import PostStub from '../../post/components/post_stub';
import FlipMove from 'react-flip-move';

class Viewpost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {posts, currentUser, deletePost, upVote, downVote, voteError, view} = this.props;
    return (
      <div className='container-fluid' id="background">
        <div className='col-md-8' id="home">
          <a href='/home' id='viewHome'>&lt;&lt; Home</a>
          <FlipMove enterAnimation="accordianHorizontal" leaveAnimation="elevator" delay="0" duration="800" staggerDelayBy="0">
          {posts.map(function(post){
            return <PostStub key={post._id} post={post} author={Meteor.users.findOne(post.createdBy)} currentUser={currentUser} deletePost={deletePost}
                              view={view} upVote = {upVote} downVote={downVote} voteError={voteError}/>})}
          </FlipMove>
          <div className="tsc_divider1" id="footer"></div>
        </div>
      </div>
    );
  }
}

export default Viewpost;
