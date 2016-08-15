import React from 'react';
import {Bert} from 'meteor/themeteorchef:bert';
import moment from 'moment';

class PostStub extends React.Component {
  constructor(props) {
    super(props);
  }

  deletePost(e){
    e.preventDefault();
    const {deletePost,post} = this.props;

    deletePost(post._id, post.upVoteCount, post.downVoteCount);
  }

  downVote(e){
    e.preventDefault();
    const {downVote,post} = this.props;
    downVote(post._id,post.upVotersUserIds,post.downVotersUserIds, post.createdBy);
  }

  upVote(e){
    e.preventDefault();
    const {upVote, post} = this.props;
    upVote(post._id, post.upVotersUserIds, post.downVotersUserIds, post.createdBy);
  }

  showModal(){
    const {showModal, post, author} = this.props;
    const newPost = {
      post: post,
      author: author,
      view: true
    }
    showModal(newPost);

  }

  render() {
    const {post,currentUser,voteError,author, view} = this.props;
    if(voteError) Bert.alert( voteError, 'danger', 'growl-top-right' );
    return (
      <div className='row container-fluid col-md-12'>
        <div className="panel panel-success" id="popOut">
          <div className="panel-heading">
                <div className='row' id='postStubHeader'>
             <a href="#">
               {
                 author.profile.picture ?
                 <img src={author.profile.picture}
                    alt={author.profile.picture}
                    className="img-circle" id='postStubImage'/> :
                 <img src="https://answers.atlassian.com/images/icons/profilepics/default.png"
                    alt="https://answers.atlassian.com/images/icons/profilepics/default.png"
                   className="img-circle" id='postStubImage'/>
               }
             </a>
             <a href={`/profile/${author._id}`} id='profileName'>{author.profile.firstName+" "+author.profile.lastName}</a>
             {
               post.isEdited ? " ("+(moment(post.createdAt).startOf('minute').fromNow())+") (Edited)" : " ("+(moment(post.createdAt).startOf('minute').fromNow() + ")")
             }
            {
              currentUser === post.createdBy ?
              <div className='dropdown' id='dropdown'>
                <a href="#" className="dropdown-toggle"
                  data-toggle="dropdown" role="button"
                  aria-haspopup="true" aria-expanded="false">
                 <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#" onClick={this.deletePost.bind(this)}>Delete</a></li>
                  <li><a href={`/update/post/${post._id}`}>Edit</a></li>
                </ul>
              </div> : <div className='dropdown' id='dropdown'></div>
            }
           </div>
          </div>
          <div className="panel-body">
           <div className='row' id='postStubBody'>
            {
              post.content.length > 160 && !view ?
              <p id='postBody'>{post.content.substr(0,1280)}
                <a  href="#"  data-toggle="modal" data-target="#myModal" onClick={this.showModal.bind(this)}>&nbsp;See more...</a>
              </p>:
              <p id='postBody'>{post.content}</p>
            }
             {
               post.postPicture ?
               <div><img src= {post.postPicture} id='postImage'></img></div> : <div></div>
             }
             
             <h4 id='votes'>
              <span id={ post.downVotersUserIds.indexOf(Meteor.userId()) === -1 ? "":"votedDown"} className="glyphicon glyphicon-hand-down" onClick={this.downVote.bind(this)}/>{post.downVoteCount}
             </h4>
             <h4 id='votes'>
              <span id={ post.upVotersUserIds.indexOf(Meteor.userId()) === -1 ? "":"votedUp"} className="glyphicon glyphicon-hand-up" onClick={this.upVote.bind(this)}/>{post.upVoteCount}
            </h4>
           </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostStub;
