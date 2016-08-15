import React from 'react';
import PostStub from '../../post/components/post_stub';
import {Bert} from 'meteor/themeteorchef:bert';
import FlipMove from 'react-flip-move';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  moreResults(){
    const {LocalState,postWithUserDetails} = this.props;
    return !(postWithUserDetails.length < LocalState.get('postLimit'));
  }

  showMoreVisible(){
    const {LocalState} = this.props;
    var threshold, target = $('#showMoreResults');
    if (target.length) {
      threshold = $(window).scrollTop() + $(window).height() - target.height();
      if (Math.floor(target.offset().top) <= threshold) {
        if (!target.data('visible')) {
          target.data('visible', true);
          LocalState.set('postLimit', LocalState.get('postLimit') + 1);
        }
      } else {
        if (target.data('visible')) {
          target.data('visible', false);
        }
      }
    }
  }

  componentWillUnmount(){
    const {LocalState} = this.props;
    LocalState.set("postLimit", null);
  }

  render() {
    const {posts,voteError, error} = this.props;
    if(error) Bert.alert( voteError, 'danger', 'growl-top-right' );
    $(window).scroll(this.showMoreVisible.bind(this));
    return (
      <div className='container-fluid' id="background">
        <div className='col-md-8' id="profile">
        {
           posts.length > 0 ?
              this.renderItems()
             :  <FlipMove enterAnimation="accordianHorizontal" leaveAnimation="accordianHorizontal" delay="700" duration="800" staggerDelayBy="50">
              <div className='row container-fluid col-md-12'>
                 <div className="panel panel-default">
                   <div className="panel-body">
                    No Post Available
                   </div>
                 </div>
               </div> </FlipMove>
    
        }
        {posts.length != 0 && this.moreResults.bind(this) ?
          <div className='row container-fluid col-md-12' id="showMoreResults">

             </div> : ""
        }
        </div>
      </div>
    );
  }

  renderItems(){
    const {posts,currentUser, deletePost, voteError, upVote, downVote, showModal} = this.props;
    return (
      <FlipMove enterAnimation="elevator" leaveAnimation="elevator" delay="250" duration="600" staggerDelayBy="50">
      {posts.map(post => (<PostStub key={post._id} post={post} author={Meteor.users.findOne(post.createdBy)} currentUser={currentUser} deletePost={deletePost}
                                                upVote = {upVote} downVote={downVote} voteError={voteError} showModal={showModal}/>))}
      </FlipMove>                                         
    )
  }
}

export default Profile;
