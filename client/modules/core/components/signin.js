import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
  }

  registerUser(){
    const {registerUser} = this.props;
    registerUser();
  }

  signinUser(e){
    e.preventDefault();
    const {signinUser, LocalState} = this.props;
    const {password} = this.refs;
    const formData = {
      username: LocalState.get('username'),
      password: password.value
    }
    signinUser(formData);
  }

  next(e){
    e.preventDefault();
    const {next, users, pictures, usersFullName} = this.props;
    const {username} = this.refs;
    next(username.value, users, pictures, usersFullName);
    username.value = "";
  }

  handleNext(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13 && !e.shiftKey){
      this.next(e);
    }
  }

  handleLogin(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13 && !e.shiftKey){
      this.signinUser(e);
    }
  }

  componentWillUnmount(){
    const {LocalState} = this.props;
    LocalState.set({
      SIGNIN_ERROR: null,
      username: null,
      avatar: null,
      name: null,
      buttonName: null
    });
  }

  back(e){
    e.preventDefault();
    const {LocalState} = this.props;
    const {password} = this.refs;
    password.value = LocalState.get('username');
    LocalState.set({
      SIGNIN_ERROR: null,
      username: null,
      avatar: null,
      name: null,
      buttonName: null
    });
  }

  clear(e){
    e.preventDefault();
    const {LocalState} = this.props;
    LocalState.set({
      SIGNIN_ERROR: null,
      username: null,
      avatar: null,
      name: null,
      buttonName: null
    });
  }

  render() {
    const {error, LocalState} = this.props;
    const avatar = LocalState.get("avatar");
    const username = LocalState.get('username');
    const name = LocalState.get('name');
    return (
      <div id="outer" className='signinBackground'>
        <div id="middle">
          <div id="innerSignin">
            <div className="panel panel-primary" id="signinPanel">
              <div className="panel-heading">
                <h3 className="panel-title">Welcome!</h3>
              </div>
              <div className="panel-body">
                <form className='form-group'>
                  <fieldset>
                    <br/>
                    {
                      username ?
                      <img id="back-arrow" className="back-arrow shift-form" aria-label="Back"
                           tabIndex="0" alt="Back"
                           src="https://www.gstatic.com/images/icons/material/system/1x/arrow_back_grey600_24dp.png"
                           onClick={this.back.bind(this)}/> : <br/>
                    }
                    <div id='signin'>
                    { avatar ?
                        <img src={avatar} alt={avatar} className="img-circle signupImage" id='signupImage'/>:
                        <img src="https://answers.atlassian.com/images/icons/profilepics/default.png"
                             alt="https://answers.atlassian.com/images/icons/profilepics/default.png"
                             className="img-circle signupImage" id='signupImage'/>
                    }
                    </div>
                    <div id='signin'>
                      {
                        name ? <h3 className='control-label'>{name}</h3>: ""
                      }
                      <label className='control-label' htmlFor={username ? "password" : "username" }>
                      {
                        username ? username : ""
                      }
                      </label>
                      <input id={username ? "password" : "username" }
                             name={username ? "password" : "username" }
                             type={username ? "password" : "text" }
                             placeholder={username ? "Password" : "Username" }
                             className='form-control' id='form-control'
                             ref={username ? "password" : "username" } onKeyDown={username ? this.handleLogin.bind(this) : this.handleNext.bind(this)}/>
                    </div>
                    <div id='signin'>
                      {
                        error ? <label className='control-label' id='signinError'>{error}</label>:<br/>
                      }
                      <br />
                      <button type="button" className="btn btn-primary" id='btnSignIn' onClick={
                        LocalState.get('buttonName') === 'Next' ? this.next.bind(this)
                        :this.signinUser.bind(this)
                      }>{LocalState.get('buttonName')}</button>
                    </div>
                    <div id='signin'>
                      <br/>
                      {
                        username ?
                        <a href="#" onClick={this.clear.bind(this)}>Signin with a different account</a>:
                        <a href="#" onClick={this.registerUser.bind(this)}>Create Account</a>
                      }
                    </div>
                    <br/><br/>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
