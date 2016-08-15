import React from 'react';
import PostStub from '../../post/components/post_stub';
import {Bert} from 'meteor/themeteorchef:bert';

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
    const {posts,currentUser, deletePost, voteError, error, upVote, downVote, showModal} = this.props;
    if(error) Bert.alert( voteError, 'danger', 'growl-top-right' );
    $(window).scroll(this.showMoreVisible.bind(this));
    return (
      <div className='container-fluid' id="background">
        <div className='col-md-8' id="profile">
        {
           posts.length > 0 ?
             posts.map(post => (<PostStub key={post._id} post={post} author={Meteor.users.findOne(post.createdBy)} currentUser={currentUser} deletePost={deletePost}
                                                upVote = {upVote} downVote={downVote} voteError={voteError} showModal={showModal}/>))
             :   <div className='row container-fluid col-md-12'>
                 <div className="panel panel-default">
                   <div className="panel-body">
                    No Post Available
                   </div>
                 </div>
               </div>
        }
        {posts.length != 0 && this.moreResults.bind(this) ?
          <div className='row container-fluid col-md-12' id="showMoreResults">

             </div> : ""
        }
        </div>
      </div>
    );
  }
}

export default Profile;
