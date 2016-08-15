import React from 'react';
import moment from 'moment';

class PostUpdate extends React.Component {
  constructor(props) {
    super(props);
  }

  discardChanges(){
    const {discardChanges} = this.props;
    discardChanges();
  }

  saveChanges(){
    const {saveChanges, post} = this.props;
    const {content, postPicture,removeImage} = this.refs;
    const formData =  {
      content: content.value,
      postPicture: postPicture.files[0]
    }
    saveChanges(formData,removeImage.checked, post._id, post.postPicture);
  }

  addAvatar(e){
    e.preventDefault();
    const {addAvatar} = this.props;
    const {postPicture} = this.refs;
    addAvatar(postPicture.files[0]);
  }

  componentWillUnmount(){
    const {LocalState} = this.props;
    LocalState.set({
      'avatar': null,
      'UPDATE_POST_ERROR': null,
    })
  }

  render() {
    const {error,post, avatar} = this.props;
    return (
      <div id="outer">
        <div id="middle">
          <div className='col-md-8' id="edit">
            <div className='row container-fluid col-md-12'>
              <div className="panel panel-default" id="popOut">
                <div className="panel-body">
                  {error ? <font id='signinError'>{error}<br/></font> : ''}
                  {"Edited "+moment(post.updatedAt).startOf('minute').fromNow()}
                  {
                    post.postPicture || avatar ?
                    <div className="row">
                      <div className="container-fluid col-md-2">
                        <a href="#" className="thumbnail">
                          <img className="img-rounded" src={avatar ? avatar: post.postPicture} alt=""/>
                        </a>
                      </div>
                    </div>: ""
                  }
                  <div className='row'>
                    <div className='container-fluid col-md-12'><textarea className="form-control" rows="10" id="post" defaultValue={post.content} ref='content'></textarea></div>
                  </div>
                  <div className='row'>
                  <br />
                  <div className='col-md-12'>
                    <label type="button" className="btn btn-success btn-file" id='editBtn'>Upload Image<input type="file" ref='postPicture'onChange={this.addAvatar.bind(this)} /></label>
                    <label><input type="checkbox" ref='removeImage'/> Remove Image</label>
                  </div>
                  <div className='col-md-12'>
                    <button className='btn btn-success' id='editButton' onClick={this.saveChanges.bind(this)}>Update</button>
                    <button className='btn btn-danger' id='editButton' onClick={this.discardChanges.bind(this)}>Discard Changes</button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostUpdate;
