import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  signupUser(e){
    e.preventDefault();
    const {signupUser} = this.props;
    const {username, password, email, profileFirstName, profileLastName, profileLocation, profileGender, profilePicture} = this.refs;
    const profile = {
      email: email.value,
      firstName: profileFirstName.value,
      lastName: profileLastName.value,
      location: profileLocation.value,
      gender: profileGender.value,
      picture: profilePicture.files[0],
    };
    const formData = {
      username: username.value,
      password: password.value,
      profile: profile
    }
    signupUser(formData);
  }

  clear(e){
    e.preventDefault();
    const {username, password, email, profileFirstName, profileLastName, profileLocation, profileGender, profilePicture} = this.refs;
    username.value = '';
    password.value = '';
    email.value = '';
    profileFirstName.value = '';
    profileLastName.value = '';
    profileLocation.value = '';
    profileGender.value = 'false';
    profilePicture.value = '';
    const {clearSignupErrors} = this.props;
    clearSignupErrors();
  }

  addAvatar(e){
    e.preventDefault();
    const {addAvatar} = this.props;
    const {profilePicture} = this.refs;
    addAvatar(profilePicture.files[0]);
  }

  render() {
    const {error, avatar} = this.props;
    return (
      <div id="outer" className="signinBackground">
        <nav className="navbar navbar-default" id='popOut'>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#" id="nav-out">
                <img alt="Brand" src="https://s10.postimg.org/b9n3rh4rt/Logo_Makr.png" id="brandLogo"/>
              </a>
            </div>
            <a href="/" id="nav-out"><button type="button" className="btn btn-success navbar-btn pull-right" id='lgbtn'>LOGIN</button></a>
          </div>
        </nav>
        <div id="innerSignup">
          <div className="panel panel-success" id='popOut'>
            <div className="panel-heading">
              <h3 className="panel-title">Register</h3>
            </div>
            <div className="panel-body">
              <form className='form-group col-md-6'><br/><br/>
                <fieldset>
                  <legend>Login credentials</legend>
                  <div className='form-group'>
                    <label className='col-sm-3 control-label' htmlFor='username' id='label'>Username:</label>
                    <div className='col-sm-8'>
                      <input id='username' ref='username' name='username' type='text' placeholder='Username' className='form-control' id='form-control'/>
                    </div><br/><br/>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-3 control-label' htmlFor='password' id='label'>Password:</label>
                    <div className='col-sm-8'>
                      <input id='password' ref='password' name='password' type='password' placeholder='Password' className='form-control'id='form-control'/>
                    </div><br/><br/>
                  </div>
                  <legend>Personal Information</legend>
                  <div className='form-group'>
                    <label className='col-sm-3 control-label' htmlFor='email' id='label'>Email:</label>
                    <div className='col-sm-8'>
                      <input id='email' ref='email' name='email' type='email' placeholder='Email' className='form-control' id='form-control'/>
                    </div><br/><br/>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-3 control-label' htmlFor='profile.firstName' id='label'>First Name:</label>
                    <div className='col-sm-8'>
                      <input id='profile.firstName' ref='profileFirstName' name='profile.firstName' type='text' placeholder='First Name' className='form-control' id='form-control'/>
                    </div><br/><br/>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-3 control-label' htmlFor='profile.lastName' id='label'>Last Name:</label>
                    <div className='col-sm-8'>
                      <input id='profile.lastName' ref='profileLastName' name='profile.lastName' type='text' placeholder='Last Name' className='form-control' id='form-control'/>
                    </div><br/><br/>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-3 control-label' htmlFor='profile.location' id='label'>Location:</label>
                    <div className='col-sm-8'>
                      <input id='profile.location' ref='profileLocation' name='profile.location' type='text' placeholder='Location' className='form-control' id='form-control'/>
                    </div><br/><br/>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-3 control-label' htmlFor='profile.gender' id='label'>Gender:</label>
                    <div className='col-sm-8'>
                      <select id='profile.gender' ref='profileGender' name='profile.gender' className='selectpicker form-control' id='form-control'>
                       <option value="false">Select Gender</option>
                       <option value="male">Male</option>
                       <option value="female">Female</option>
                      </select>
                    </div><br/><br/>
                  </div>
                </fieldset>
              </form>
              <div className='col-md-6'><br/><br/><br/>
                {
                  avatar ?
                    <img src={avatar}
                    alt={avatar}
                    className="img-circle signupImage" id='signupImage'/>:
                    <img src="https://answers.atlassian.com/images/icons/profilepics/default.png"
                    alt="https://answers.atlassian.com/images/icons/profilepics/default.png"
                    className="img-circle signupImage" id='signupImage'/>
                }
                <br/>
                <label type="button" className="btn btn-info btn-file" id='addAvatar'>ADD AVATAR<input type="file" ref='profilePicture' onChange={this.addAvatar.bind(this)}/></label>
                <br/><br/>
                {
                  error ?
                  <div className="panel panel-danger">
                    <div className="panel-heading">
                      <h3 className="panel-title">Error</h3>
                    </div>
                    <div className="panel-body">
                      {error}
                    </div>
                  </div> :
                  <div><br/><br/><br/><br/><br/></div>
                }
                <div className='signupButtons'><br/><br/><br/><br/><br/>
                  <button type="button" className="btn btn-success pull-right" id='btn' onClick={this.signupUser.bind(this)}>SUBMIT</button>
                  <button type="button" className="btn btn-danger pull-right" id='btn' onClick={this.clear.bind(this)}>CLEAR</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
