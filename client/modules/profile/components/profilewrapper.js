import React from 'react';
import HeaderProfile from '../../header/containers/header_profile';
import Profile from '../containers/profile';
import moment from 'moment';


class Profilewrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {post: ""};
  }

  showModal(newPost){
    this.setState({post: newPost});
  }

  closeModal(){
    window.location = `/profile/${this.state.post.author._id}`;
  }

  render() {
    const {id} = this.props;
    return (
      <div>
        <HeaderProfile id={id}/>
        <div className="col-md-12"></div>
        <Profile id={id} showModal={this.showModal.bind(this)}/>
        {
          this.state.post ?
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <div className='row' id='postStubHeader'>
                   <a href="#">
                     {
                       this.state.post.author.profile.picture ?
                       <img src={this.state.post.author.profile.picture}
                          alt={this.state.post.author.profile.picture}
                          className="img-circle" id='postStubImage'/> :
                       <img src="https://answers.atlassian.com/images/icons/profilepics/default.png"
                          alt="https://answers.atlassian.com/images/icons/profilepics/default.png"
                         className="img-circle" id='postStubImage'/>
                     }
                   </a>
                   <a href="#" data-dismiss="modal" onClick={this.closeModal.bind(this)} id='profileName'>{this.state.post.author.profile.firstName+" "+this.state.post.author.profile.lastName}</a>
                   {
                     this.state.post.post.isEdited ? " ("+(moment(this.state.post.post.createdAt).startOf('minute').fromNow())+") (Edited)" : " ("+(moment(this.state.post.post.createdAt).startOf('minute').fromNow() + ")")
                   }
                 </div>
                </div>
                <div className="modal-body">
                  <div className='row' id='postStubBody'>
                   {
                     this.state.post.post.content.length > 160 && !this.state.post.view ?
                     <p id='postBody'>{this.state.post.post.content.substr(0,(Math.floor(this.state.post.post.content.length*.30)))}
                       <a data-toggle="modal" data-target="#myModal" onClick={this.showModal.bind(this)}>&nbsp;See more...</a>
                     </p>:
                     <p id='postBody'>{this.state.post.post.content}</p>
                   }
                    {
                      this.state.post.post.postPicture ?
                      <div><img src= {this.state.post.post.postPicture} id='postImage'></img></div> : <div></div>
                    }
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>

            </div>
          </div> : ""
        }
      </div>
    );
  }
}

export default Profilewrapper;
