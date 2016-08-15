import React from 'react';

class PostBox extends React.Component {
  constructor(props) {
    super(props);
  }

  addPost(e){
    e.preventDefault();
    const {addPost,LocalState} = this.props;
    const {postPicture,content} = this.refs;
    const formData = {
      content: content.value,
      postPicture: postPicture.files[0]
    }
    addPost(formData);
    if(!LocalState.get('POST_ERROR')){
      content.value = '',
      postPicture.value = '';
      LocalState.set('avatar', null);
    }
  }

  addAvatar(e){
    e.preventDefault();
    const {addAvatar} = this.props;
    const {postPicture} = this.refs;
    addAvatar(postPicture.files[0]);
  }

  removeAvatar(e){
    e.preventDefault();
    const {removeAvatar} = this.props;
    const {postPicture} = this.refs;
    postPicture.value = '';
    removeAvatar();
  }

  componentWillUnmount(){
    const {LocalState} = this.props;
    LocalState.set({
      'avatar': null,
      'POST_ERROR': null,
    })
  }

  render() {
    const {LocalState, avatar} = this.props;
    return (
      <div className='row container-fluid col-md-12'>
        <div className="panel panel-success" id="popOut">
          <div className="panel-body">
            <div className='row'>
              {LocalState.get('POST_ERROR') ? <font id='signinError'>{LocalState.get('POST_ERROR')}</font>: ''}
              <div className='container-fluid col-md-10'><textarea className="form-control" rows="5" id="post" ref='content'></textarea>
              {
                avatar ?
                <div className="row">
                  <div className="col-xs-6 col-md-3">
                    <a onClick={this.removeAvatar.bind(this)} className='pull-right'><span className="glyphicon glyphicon-remove-sign" aria-hidden="true" id='closebtn'></span></a>
                    <a href="#" className="thumbnail">
                      <img className="img-rounded" src={avatar} alt=""/>
                    </a>
                  </div>
                </div>: ""
              }
              </div>
              <div className='container-fluid col-md-2' id='postButtons'>
                <button className='btn btn-success' id='postBtn' onClick={this.addPost.bind(this)}>Post</button>
              </div>
              <div className='container-fluid col-md-2' id='postButtons'>
                <label type="button" className="btn btn-success btn-file" id='postBtn'>
                  <span className="glyphicon glyphicon-camera" aria-hidden="true" id='camera'></span>
                  <input type="file" ref='postPicture' onChange={this.addAvatar.bind(this)}/>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostBox;
